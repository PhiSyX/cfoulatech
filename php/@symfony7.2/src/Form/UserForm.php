<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Vich\UploaderBundle\Form\Type\VichImageType;

class UserForm extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$builder
			->add("firstname", options: [
				"label" => "user.form.firstname",
			])
			->add("lastname", options: [
				"label" => "user.form.lastname",
			])
			->add("imageFile", VichImageType::class, [
				"required" => false,
				"allow_delete" => true,
				"delete_label" => "Delete profile image",
				"download_uri" => true,
				"image_uri" => true,
				"asset_helper" => true,
				"imagine_pattern" => "avatar_thumbnail",
			])
		;
	}

	public function configureOptions(OptionsResolver $resolver): void
	{
		$resolver->setDefaults([
			'data_class' => User::class,
		]);
	}
}
