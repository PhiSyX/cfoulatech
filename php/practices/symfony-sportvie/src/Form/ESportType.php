<?php

namespace App\Form;

use App\Entity\ESport;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ESportType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('nomDuJeu')
            ->add('typeDeJeu')
            ->add('regleDuJeu')
            ->add('nbJoueurEquipe')
            ->add('dateDeSortie', null, [
                'widget' => 'single_text',
            ])
            ->add('pourAdulte')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ESport::class,
        ]);
    }
}
