<?php

namespace App\Controller;

use App\Entity\Photo;
use App\Entity\Utilisateur;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

final class UtilisateurController extends AbstractController
{
    public function __construct(
        private SerializerInterface $serializer,
    )
    {

    }

    #[Route('/api/me', name: 'app_me')]
    public function me(): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');
        $user = $this->getUser();
        $data = $this->serializer->serialize($user, 'jsonld', ['groups' => ['user:read']]);
        return new Response($data, 200, ['Content-Type' => 'application/ld+json']);
    }

    #[Route(
        '/api/utilisateurs/{id}/upload',
        name: 'app_utilisateur_uploads',
        methods: ['POST'],
    )]
    public function upload(
        Request                                                         $request,
        EntityManagerInterface                                          $entityManager,
        Utilisateur                                                     $user,
        #[Autowire('%kernel.project_dir%/public/uploads/users')] string $uploadsDirectory,
    ): Response
    {
        try {
            $imageFile = $request->files->get('avatar');
            $newFilename = uniqid() . '.' . $imageFile->guessExtension();

            $imageFile->move($uploadsDirectory, $newFilename);

            $oldPhoto = $user->getPhoto();

            $photo = (new Photo())
                ->setTitle("Photo de l'utilisateur {$user->getPrenom()}")
                ->setChemin("/uploads/users/$newFilename");

            $user->setPhoto($photo);

            $entityManager->persist($user);
            $entityManager->flush();

            if ($oldPhoto) {
                @unlink(
                    $uploadsDirectory .
                    str_replace("/uploads/users", "", $oldPhoto->getChemin()),
                );
            }

            $data = $this->serializer->serialize($photo, 'jsonld');
            return new Response($data, 200, ['Content-Type' => 'application/ld+json']);
        } catch (FileException $e) {
            throw $this->createAccessDeniedException();
        }
    }

    #[Route(
        '/api/utilisateurs/{id}/avatar',
        name: 'app_utilisateur_delete_avatar',
        methods: ['DELETE']
    )]
    public function deleteAvatar(
        EntityManagerInterface                                          $entityManager,
        Utilisateur                                                     $user,
        #[Autowire('%kernel.project_dir%/public/uploads/users')] string $uploadsDirectory,
    ): Response
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY');

        $photo = $user->getPhoto()?->getChemin();

        $user->setPhoto(null);
        $entityManager->persist($user);
        $entityManager->flush();

        if ($photo) {
            @unlink(
                $uploadsDirectory .
                str_replace("/uploads/users", "", $photo),
            );
        }

        $data = $this->serializer->serialize($user, 'jsonld', ['groups' => ['user:read']]);
        return new Response($data, 200, ['Content-Type' => 'application/ld+json']);
    }
}
