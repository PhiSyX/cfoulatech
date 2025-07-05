<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class SessionController extends AbstractController
{
    private const SESSION_KEY = 'totalVisits.app_session';

    #[Route('/session', name: 'app_session')]
    public function index(Request $request): Response
    {
        $session = $request->getSession();

        $totalVisits = 1;

        if ($session->has(self::SESSION_KEY)) {
            $totalVisits = $session->get(self::SESSION_KEY) + 1;
        }

        $session->set(self::SESSION_KEY, $totalVisits);

        return $this->render('session/index.html.twig', [
            'totalVisits' => $totalVisits,
        ]);
    }
}
