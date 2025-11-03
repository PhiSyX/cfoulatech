<?php

namespace App\Form;

use Symfony\Component\Validator\Constraints as Assert;

final readonly class ResetPasswordRequestForm
{
    public function __construct(
        #[Assert\NotBlank(message: 'Veuillez entrer votre mail')]
        #[Assert\Email]
        public string $email,
    )
    {
    }
}
