<?php

namespace App\Controller;

use App\Form\ContactUsForm;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Attribute\Route;

final class ContactController extends AbstractController
{
    public function __construct(
        private MailerInterface        $mailer,
        private EntityManagerInterface $entityManager,
    )
    {
    }

    // Nous utilisons à présent l'événement `ContactMessageMailSubscriber`
    // plutôt que cette route.
    #[Route('/api/contact-us', name: 'app_contact', methods: ['POST'])]
    public function contactUs(
        #[MapRequestPayload] ContactUsForm $contactUsForm,
    ): Response
    {
        try {
            // Etape 1:
            $contactMessage = $contactUsForm->toContactMessageModel();
            if ($this->getUser()) {
                $contactMessage->setUtilisateur($this->getUser());
            }
            $this->entityManager->persist($contactMessage);
            $this->entityManager->flush();

            // Si l'envoie d'email échoue, au moins on est sûr que le mail est
            // sauvegardé en base de données.

            // Etape 2:

            // Les informations de l'utilisateur sont dans le template `contact/mail.html.twig`
            $templatedEmail = (new TemplatedEmail())
                ->from(new Address('noreply@immauweb.local', 'ImmauWeb Contact'))
                ->to('admin@immauweb.local')
                ->subject($contactUsForm->sujet)
                ->htmlTemplate('contact/mail.html.twig');

            $context = $templatedEmail->getContext();
            $context['contactUsForm'] = $contactUsForm;

            $templatedEmail->context($context);

            $this->mailer->send($templatedEmail);

            return $this->json([
                'success' => 'Votre message a été envoyé avec succès',
            ], 201);
        } catch (\Exception $e) {
            return $this->json([
                'message' => $e->getMessage(),
            ], 503);
        }
    }
}
