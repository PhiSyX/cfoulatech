<?php

namespace App\Form;

use App\Entity\ContactMessage;
use App\Validator\Badwords;
use Symfony\Component\Validator\Constraints as Assert;

// NOTE : Pas besoin de getters et de setters.
//
// Les classes readonly ont également les propriétés en `readonly`
readonly class ContactUsForm
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Length(min: 2, max: 255)]
        public string $nomComplet,

        #[Assert\NotBlank]
        #[Assert\Email]
        public string $email,

        #[Assert\NotBlank]
        #[Assert\Length(min: 10)]
        public string $telephone,

        #[Assert\NotBlank]
        #[Assert\Length(min: 10)]
        #[Badwords(['merde', 'pourri', 'caca'])]
        public string $sujet,

        #[Assert\NotBlank]
        #[Assert\Length(min: 50)]
        #[Badwords(['merde', 'pourri', 'caca'])]
        public string $message,
    )
    {
    }

    public function toContactMessageModel(): ContactMessage
    {
        $msg = new ContactMessage();
        $msg->setNomComplet($this->nomComplet);
        $msg->setEmail($this->email);
        $msg->setTelephone($this->telephone);
        $msg->setSujet($this->sujet);
        $msg->setMessage($this->message);
        $msg->setCreatedAt(new \DateTimeImmutable());
        return $msg;
    }
}
