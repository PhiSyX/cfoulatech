<?php

namespace App\Form;

use App\Entity\Utilisateur;
use Symfony\Component\Validator\Constraints as Assert;

// NOTE : Pas besoin de getters et de setters.
//
// Les classes readonly ont également les propriétés en `readonly`
readonly class RegistrationForm
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Length(min: 2, max: 255)]
        public string $prenom,

        #[Assert\NotBlank]
        #[Assert\Length(min: 2, max: 255)]
        public string $nom,

        #[Assert\NotBlank]
        #[Assert\Email]
        public string $email,

        #[Assert\NotBlank]
        #[Assert\Length(min: 4, max: 64)]
        public string $plainPassword,

        #[Assert\NotBlank]
        #[Assert\Length(min: 10)]
        public string $telephone,
    )
    {
    }

    public function toUtilisateurEntity(): Utilisateur
    {
        $user = new Utilisateur();
        $user->setPrenom($this->prenom);
        $user->setNom($this->nom);
        $user->setEmail($this->email);
        $user->setTelephone($this->telephone);
        return $user;
    }
}
