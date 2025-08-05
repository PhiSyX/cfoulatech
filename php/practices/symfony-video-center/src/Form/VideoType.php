<?php

namespace App\Form;

use App\Entity\Video;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Event\PreSubmitEvent;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class VideoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('title')
            ->add('description')
            ->add('videoYTID')
            ->add('premium', CheckboxType::class, [
                'required' => false,
            ])
            ->addEventListener(FormEvents::PRE_SUBMIT, $this->takeVideoId(...));
    }

    private function takeVideoId(PreSubmitEvent $event)
    {
        $data = $event->getData();
        $videoYTID = trim($data['videoYTID']);

        // https://www.youtube.com/watch?v=DcaAhatuHD0
        if (str_starts_with($videoYTID, "https://www.youtube.com/watch")) {
            [, $videoYTID] = explode('=', $videoYTID);
            $data['videoYTID'] = $videoYTID;
            $event->setData($data);
        } // https://www.youtube.com/embed/DcaAhatuHD0
        else if (str_starts_with($videoYTID, 'https://www.youtube.com/embed/')) {
            $videoYTID = str_replace('https://www.youtube.com/embed/', '', $videoYTID);
            $data['videoYTID'] = $videoYTID;
            $event->setData($data);
        }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Video::class,
        ]);
    }
}
