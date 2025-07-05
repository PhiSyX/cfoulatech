<?php

namespace App\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Event\PreSubmitEvent;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\String\Slugger\AsciiSlugger;
use Symfony\Component\Validator\Constraints as Asserts;

class TodoCreateType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('taskName', TextType::class, [
                'label' => 'todos.form.taskName',
                'constraints' => [
                    new Asserts\NotBlank(),
                    new Asserts\Length(min: 5, max: 255),
                ],
            ])
            ->add('todo', TextType::class, [
                'label' => 'todos.form.todo',
                'constraints' => [
                    new Asserts\NotBlank(),
                    new Asserts\Length(min: 10, max: 250),
                ],
            ])
            ->add('add', SubmitType::class, ['label' => 'actions.add'])
            ->addEventListener(FormEvents::PRE_SUBMIT, $this->preSubmit(...));
    }

    private function preSubmit(PreSubmitEvent $event): void
    {
        $data = $event->getData();
        $slugger = new AsciiSlugger();
        $slug = $slugger->slug($data["taskName"])->lower()->toString();
        if ($data["taskName"] !== $slug) {
            $data["taskName"] = $slug;
            $event->setData($data);
        }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            // Configure your form options here
        ]);
    }
}
