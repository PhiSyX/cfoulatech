<?php

namespace App\Form;

use App\DTO\SearchDTO;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SearchType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class SearchForm extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$placeholder = $options["attr"]["placeholder"] ?? "Rechercher...";
		$builder
			->add("q", SearchType::class, [
				"label" => false,
				"attr" => [
					"placeholder" => $placeholder,
				],
				"trim" => true,
				"constraints" => [
					new NotBlank(),
					new Length([
						"min" => 3,
					]),
				],
			]);
	}

	public function configureOptions(OptionsResolver $resolver): void
	{
		$resolver->setDefaults([
			"data_class" => SearchDTO::class,
			"method" => "GET",
			"csrf_protection" => false,
		]);
	}
}
