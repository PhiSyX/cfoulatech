<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

final class BadwordsValidator extends ConstraintValidator
{
	public function validate(mixed $value, Constraint $constraint): void
	{
		/* @var Badwords $constraint */

		if (null === $value || '' === $value) {
			return;
		}

		$value = strtolower($value);

		$v = $this->context->buildViolation($constraint->message);

		foreach ($constraint->list as $badword) {
            $c =  count(array_filter(
                explode(' ', $value),
                fn ($w) => strtolower($w) === strtolower($badword),
            ));

			if ($c > 0) {
				$v->setParameter('{{ badword }}', $badword)->addViolation();
			}
		}
	}
}
