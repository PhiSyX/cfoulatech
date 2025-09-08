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

		foreach ($constraint->list as $listWord) {
			if (str_contains($value, strtolower($listWord))) {
				$v->setParameter('{{ badword }}', $listWord)->addViolation();
			}
		}
	}
}
