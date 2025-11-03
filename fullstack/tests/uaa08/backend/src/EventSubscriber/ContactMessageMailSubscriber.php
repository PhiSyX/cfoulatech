<?php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\ContactMessage;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;

// Ce code est basé sur l'exemple de la documentation d'ApiPlatform, voir le lien.
//
// > "In the following example, we will send a mail each time a new book
// >  is created using the API:"
// > Lien: https://api-platform.com/docs/core/events/
final readonly class ContactMessageMailSubscriber implements EventSubscriberInterface
{
    public function __construct(private MailerInterface $mailer)
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => ['sendMail', EventPriorities::POST_WRITE],
        ];
    }

    public function sendMail(ViewEvent $event): void
    {
        $contactMessage = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if (!($contactMessage instanceof ContactMessage) || Request::METHOD_POST !== $method) {
            return;
        }

        $templatedEmail = (new TemplatedEmail())
            ->from(new Address('noreply@immauweb.local', 'ImmauWeb Contact'))
            ->to('admin@immauweb.local')
            ->subject($contactMessage->getSujet())
            ->htmlTemplate('contact/mail.html.twig');

        $context = $templatedEmail->getContext();
        $context['contactUsForm'] = $contactMessage;

        $templatedEmail->context($context);

        $this->mailer->send($templatedEmail);
    }
}
