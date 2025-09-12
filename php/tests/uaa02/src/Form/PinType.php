<?php

namespace App\Form;

use App\Entity\Pin;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\UrlType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Length;

class PinType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title', TextType::class, [
                'label' => 'Titre du Pin',
                'attr' => [
                    'class' => 'width-full',
                    'placeholder' => 'Fleur de Pin',
                ],
            ])
            ->add('description', TextareaType::class, [
                'label' => "Description du Pin",
                'attr' => [
                    'style' => 'width: 400px',
                    'placeholder' => 'Ma superbe description',
                ],
                'required' => false,
            ])
            ->add('imageName', UrlType::class, [
                'label' => 'URL de l\'image du Pin',
                'attr' => [
                    'class' => 'width-full',
                    'placeholder' => 'https://',
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Pin::class,
        ]);
    }
}
