<?php

namespace App\Form;

use App\Entity\Sport;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SportForm extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nom', options: ["label" => "Name"])
            ->add('regles', options: ["label" => "Rules"])
            ->add('tempsDeJeu', options: ["label" => "Play Time"])
            ->add('createdAt', null, [
                'widget' => 'single_text',
                'label' => 'Created At',
            ])
            ->add('save', SubmitType::class, ['label' => 'Update'])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Sport::class,
        ]);
    }
}
