<?php

namespace App\Form;

use Symfony\Component\Validator\Constraints as Assert;

final readonly class ChangePasswordForm
{
    public function __construct(
        #[Assert\NotBlank]
        #[Assert\Length(min: 12, max: 4096, minMessage: 'Your password should be at least {{ limit }} characters')]
        #[Assert\PasswordStrength]
        #[Assert\NotCompromisedPassword]
        public string $plainPassword,
    )
    {

    }
}
