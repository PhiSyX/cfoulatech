<?php

namespace App\Controller;

use App\Entity\Photo;
use App\Entity\Propriete;
use App\Entity\ProprietePhoto;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class ProprieteController extends AbstractController
{
    #[Route('/api/proprietes/{id}/upload', name: 'app_propriete_upload', methods: ['POST'])]
    public function upload(
        Request                                                              $request,
        EntityManagerInterface                                               $entityManager,
        SerializerInterface                                                  $serializer,
        Propriete                                                            $propriete,
        #[Autowire('%kernel.project_dir%/public/uploads/proprietes')] string $uploadsDirectory,
    ): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        try {
            $imageFile = $request->files->get('photo');
            $newFilename = uniqid() . '.' . $imageFile->guessExtension();

            $imageFile->move($uploadsDirectory, $newFilename);

            $photo = (new Photo())
                ->setChemin("/uploads/proprietes/$newFilename");
            $entityManager->persist($photo);
            $entityManager->flush();

            $proprietePhoto = (new ProprietePhoto())
                ->setPhoto($photo)
                ->setPropriete($propriete);

            $propriete->addPhoto($proprietePhoto);

            $entityManager->persist($propriete);
            $entityManager->flush();

            $data = $serializer->serialize($proprietePhoto, 'jsonld');
            return new Response($data, 201, ['Content-Type' => 'application/ld+json']);
        } catch (FileException $e) {
            throw $this->createAccessDeniedException($e->getMessage());
        }
    }
}
