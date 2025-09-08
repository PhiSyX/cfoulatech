<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegistrationForm extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$builder
			->add("firstname", TextType::class, ["label" => "registration.form.firstname"])
			->add("lastname", TextType::class, ["label" => "registration.form.lastname"])
			->add("email", EmailType::class, ["label" => "registration.form.email",])
			->add("agreeTerms", CheckboxType::class, [
				"label" => "registration.form.agreeTerms",
				"mapped" => false,
				"constraints" => [
					new IsTrue([
						"message" => "registration.form.validation.tos",
					]),
				],
			])
			->add("plainPassword", PasswordType::class, [
				"label" => "registration.form.plainPassword",
				// instead of being set onto the object directly,
				// this is read and encoded in the controller
				"mapped" => false,
				"attr" => ["autocomplete" => "new-password"],
				"constraints" => [
					new NotBlank(),
					new Length([
						"min" => 6,
						// max length allowed by Symfony for security reasons
						"max" => 4096,
					]),
				],
			]);
	}

	public function configureOptions(OptionsResolver $resolver): void
	{
		$resolver->setDefaults([
			"data_class" => User::class,
		]);
	}
}
