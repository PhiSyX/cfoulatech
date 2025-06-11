<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute(\Attribute::TARGET_PROPERTY | \Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
final class Badwords extends Constraint
{
	// public string $message = 'This value "{{ badword }}" is a bad word';

	// You can use #[HasNamedArguments] to make some constraint options required.
	// All configurable options must be passed to the constructor.
	public function __construct(
		public array  $list = [],
		public string $message = 'This value {{ badword }} is a bad word',
		mixed         $options = null,
		?array        $groups = null,
		mixed         $payload = null,
	)
	{
		parent::__construct($options, $groups, $payload);
	}
}
