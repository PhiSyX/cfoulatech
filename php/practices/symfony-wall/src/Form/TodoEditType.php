<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints as Asserts;

class TodoEditType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('todo', TextType::class, [
                'label' => 'todos.form.todo',
                'constraints' => [
                    new Asserts\NotBlank(),
                    new Asserts\Length(min: 10, max: 255),
                ]
            ])
            ->add('save', SubmitType::class, ['label' => 'actions.save']);;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
