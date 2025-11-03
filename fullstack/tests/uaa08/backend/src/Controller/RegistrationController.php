<?php

namespace App\Controller;

use App\Form\RegistrationForm;
use App\Repository\UtilisateurRepository;
use App\Security\EmailVerifier;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Mailer\Exception\TransportException;
use Symfony\Component\Mime\Address;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use SymfonyCasts\Bundle\VerifyEmail\Exception\VerifyEmailExceptionInterface;

final class RegistrationController extends AbstractController
{
    public function __construct(
        private readonly EmailVerifier         $emailVerifier,
        private readonly UtilisateurRepository $utilisateurRepository,
    )
    {
    }

    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(
        UserPasswordHasherInterface           $userPasswordHasher,
        EntityManagerInterface                $entityManager,
        SerializerInterface                   $serializer,
        #[MapRequestPayload] RegistrationForm $registrationForm,
    ): Response
    {
        try {
            $user = $registrationForm->toUtilisateurEntity();
            $plainPassword = $registrationForm->plainPassword;
            $user->setPassword($userPasswordHasher->hashPassword($user, $plainPassword));
            $entityManager->persist($user);
            $entityManager->flush();

            // Si le service n'est pas présent, ça ne devrait pas impacter l'inscription.
            try {
                $this->emailVerifier->sendEmailConfirmation('app_verify_email', $user,
                    (new TemplatedEmail())
                        ->from(new Address('noreply@immauweb.local', 'ImmauWeb Project'))
                        ->to((string)$user->getEmail())
                        ->subject('Veuillez confirmer votre adresse mail')
                        ->htmlTemplate('registration/confirmation_email.html.twig'),
                );
            } catch (TransportException $e) {
            }

            $data = $serializer->serialize($user, 'jsonld', ['groups' => ['user:read']]);
            return new Response($data, 201, ['Content-Type' => 'application/ld+json']);
        } catch (UniqueConstraintViolationException $e) {
            return $this->json([
                'message' => "La valeur ($registrationForm->email) pour le champ " .
                    "email est déjà existante en base de données, " .
                    "veuillez réessayer avec une nouvelle valeur.",
            ], 422);
        }
    }

    #[Route('/verify/email', name: 'app_verify_email')]
    public function verifyUserEmail(Request $request): Response
    {
        try {
            $uid = (int)$request->query->get('uid');
            $user = $this->utilisateurRepository->find($uid);
            $this->emailVerifier->handleEmailConfirmation($request, $user);
        } catch (VerifyEmailExceptionInterface $e) {
            return $this->redirect('http://localhost:4200/register?error=verify_email');
        }
        return $this->redirect('http://localhost:4200/login?success=verify_email');
    }
}
