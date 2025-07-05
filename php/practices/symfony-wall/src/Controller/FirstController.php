<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class FirstController extends AbstractController
{
    #[Route('/first', name: 'app_first')]
    public function index(): Response
    {
//        return new Response("
//            <!DOCTYPE html>
//            <html lang='fr'>
//                <head>
//                    <meta charset='UTF-8'>
//                    <title>Title</title>
//                </head>
//                <body>
//                    <h1>Hello PhiSyX</h1>
//                </body>
//            </html>
//        ");

//        dump("Je suis la requête /first");
//        dd("Je suis la requête /first");

        return $this->render('first/index.html.twig', [
            'var1' => 'value1',
            'var2' => 'value2',
        ]);
    }

    #[Route('/say-hello/{lastname}/{firstname}', name: 'app_say_hello')]
    public function sayHello(string $lastname, string $firstname): Response
    {
        $rand = rand(0, 10);

        // exemple :
        //
        // tous les pairs, on affiche le contenu index de ce controller.
        if ($rand % 2 === 0) {
//            return $this->redirectToRoute('app_first', ['qs' => $rand]);
            return $this->forward(FirstController::class . '::index');
        }

//        $firstname = mb_ucfirst($firstname);
        return $this->render('first/hello.html.twig', [
//            'lastname' => $lastname,
//            'firstname' => $firstname,
            'fullname' => $firstname . ' ' . $lastname,
        ]);
    }
}
