<?php

namespace App\Controller;

use App\Entity\Video;
use App\Form\VideoType;
use App\Repository\VideoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsCsrfTokenValid;
use Symfony\Component\Security\Http\Attribute\IsGranted;

final class VideoController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function home(VideoRepository $repository): Response
    {
        $heros = [
            [
                'figure' => '/images/hero/stand.jpg',
                'color' => '#d2457f',
                'primary' => '#d2457f',
            ],
            [
                'figure' => '/images/hero/jul.jpg',
                'color' => '#d1b43d',
                'primary' => '#d1b43d',
            ],
            [
                'figure' => '/images/hero/aimable.jpg',
                'color' => '#5BA2C1',
                'primary' => '#f46e37',
            ],
        ];
        $hero = $heros[array_rand($heros)];

        $videos = $repository->latest(
            premium: (bool)$this->getUser(),
            nb: 9,
        );

        return $this->render('pages/home.html.twig', [
            'body' => [
                'color' => $hero['color'],
                'primary' => $hero['primary'],
            ],
            'hero' => $hero,
            'videos' => $videos,
        ]);
    }

    #[Route('/video/{id}', name: 'app_video_show', requirements: ['id' => '\\d+'])]
    public function show(VideoRepository $repository, int $id): Response
    {
        $video = $repository->find($id);

        if (!$video) {
            throw $this->createNotFoundException("Cette vidéo n'existe pas");
        }

        return $this->render('video/show.html.twig', [
            'hero' => [
                'figure' => $video->getThumbnailLink(),
                'video' => $video->getVideoLink(),
            ],
            'video' => $video,
        ]);
    }

    #[Route('/video/create', name: 'app_video_create', methods: ['GET', 'POST'])]
    #[IsGranted("IS_AUTHENTICATED_FULLY")]
    public function create(Request $request, EntityManagerInterface $em): Response
    {
        $videoData = (new Video())
            ->setCreatedAt(new \DateTimeImmutable())
            ->setUpdatedAt(new \DateTimeImmutable())
            ->setUser($this->getUser());

        $videoForm = $this->createForm(VideoType::class, $videoData, [
            'method' => 'POST',
        ]);
        $videoForm->handleRequest($request);

        if ($videoForm->isSubmitted() && $videoForm->isValid()) {
            $em->persist($videoData);
            $em->flush();
            $this->addFlash("success", "La vidéo '{$videoData->getTitle()}' a bien été créée.");
            return $this->redirectToRoute("app_video_show", [
                'id' => $videoData->getId(),
            ]);
        }

        return $this->render('video/form.html.twig', [
            'title' => 'Création de vidéo',
            'videoForm' => $videoForm,
        ]);
    }

    #[Route('/video/{id}/edit', name: 'app_video_edit', methods: ['GET', 'PUT'])]
    #[IsGranted("IS_AUTHENTICATED_FULLY")]
    public function edit(Request $request, EntityManagerInterface $em, VideoRepository $repository, int $id): Response
    {
        $video = $repository->find($id);

        if (!$video) {
            throw $this->createNotFoundException("Cette vidéo n'existe pas");
        }

        if ($video->getUser() !== $this->getUser()) {
            throw $this->createAccessDeniedException("Cette vidéo ne vous appartient pas");
        }

        $videoData = $video;
        $videoForm = $this->createForm(VideoType::class, $videoData, [
            'method' => 'PUT',
        ]);
        $videoForm->handleRequest($request);

        if ($videoForm->isSubmitted() && $videoForm->isValid()) {
            $video->setUpdatedAt(new \DateTimeImmutable());
            $em->flush();
            $this->addFlash("success", "La vidéo '{$videoData->getTitle()}' a bien été mis à jour.");
            return $this->redirectToRoute("app_video_show", [
                'id' => $videoData->getId(),
            ]);
        }

        return $this->render('video/form.html.twig', [
            'title' => 'Edition de vidéo',
            'videoForm' => $videoForm,
        ]);
    }

    #[Route('/video/{id}/delete', name: 'app_video_delete', methods: ['DELETE'])]
    #[IsGranted('IS_AUTHENTICATED_FULLY')]
    #[IsCsrfTokenValid('delete-video')]
    public function delete(EntityManagerInterface $em, VideoRepository $repository, int $id): Response
    {
        $video = $repository->find($id);

        if (!$video) {
            throw $this->createNotFoundException("Cette vidéo n'existe pas");
        }

        if ($video->getUser() !== $this->getUser()) {
            throw $this->createAccessDeniedException("Cette vidéo ne vous appartient pas");
        }

        $em->remove($video);
        $em->flush();
        $this->addFlash("success", "La vidéo a bien été supprimé de la base de donnée.");

        return $this->redirectToRoute('app_home');
    }
}
