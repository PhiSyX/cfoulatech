<?php

namespace App\Form;

use App\Entity\Recipe;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Event\PreSubmitEvent;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\String\Slugger\AsciiSlugger;

class RecipeType extends AbstractType
{
	public function buildForm(FormBuilderInterface $builder, array $options): void
	{
		$saveLabel = $options["label"]["save"] ?? "Envoyer";
		$builder
			->add("title", TextType::class, ["label" => "Titre"])
			->add("slug", HiddenType::class)
			->add("content", TextareaType::class, ["label" => "Description de la recette"])
			->add("imageName", URLType::class, [
				"label" => "URL de l'image",
				"default_protocol" => "https"
			])
			->add("duration", NumberType::class, ["label" => "Durée de la préparation"])
			->add("save", SubmitType::class, ["label" => $saveLabel . " la recette"])
			->addEventListener(FormEvents::PRE_SUBMIT, $this->preSubmit(...));
	}

	private function preSubmit(PreSubmitEvent $event): void
	{
		$data = $event->getData();
		$slugger = new AsciiSlugger();
		$slug = $slugger->slug($data["title"])->lower()->toString();
		if (empty($data["slug"]) || $data["slug"] !== $slug) {
			$data["slug"] = $slug;
			$event->setData($data);
		}
	}

	public function configureOptions(OptionsResolver $resolver): void
	{
		$resolver->setDefaults([
			"data_class" => Recipe::class,
		]);
	}
}
