<?php

namespace App\Controller;

use App\Form\TodoCreateType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

final class TodosController extends AbstractController
{
    private const SESSION_KEY = 'todos.app_todos';

    public function __construct(private readonly TranslatorInterface $translator)
    {
    }

    #[Route('/todos', name: 'app_todos')]
    public function index(Request $request): Response
    {
        $createTodo = $this->createForm(TodoCreateType::class, options: [
            'action' => $this->generateUrl('app_todo_new'),
            'method' => 'POST'
        ])->handleRequest($request);

        $session = $request->getSession();

        if (!$session->has(self::SESSION_KEY)) {
            $session->set(self::SESSION_KEY, []);
        }

        $todos = $session->get(self::SESSION_KEY);

        return $this->render('todo/index.html.twig', [
            'createTodo' => $createTodo,
            'todos' => $todos,
        ]);
    }

    #[Route('/todos/new', name: 'app_todo_new', methods: ['POST'])]
    public function add(Request $request): Response
    {
        $form = $this->createForm(TodoCreateType::class)->handleRequest($request);

        $session = $request->getSession();

        if (!$session->has(self::SESSION_KEY)) {
            $session->set(self::SESSION_KEY, []);
        }

        $todos = $session->get(self::SESSION_KEY);

        if ($form->isSubmitted() && $form->isValid()) {
            if (isset($todos[$form->get("taskName")->getData()])) {
                $this->addFlash("danger", $this->translator->trans('todos.error.already_exists', [
                    '%taskName%' => $form->get("taskName")->getData()
                ]));
            } else {
                $todos[$form->get("taskName")->getData()] = $form->get("todo")->getData();
                $session->set(self::SESSION_KEY, $todos);
                $this->addFlash("success", $this->translator->trans('todos.success.created', [
                    '%taskName%' => $form->get("taskName")->getData()
                ]));
            }

            return $this->redirectToRoute('app_todos');
        }

        return $this->forward(TodosController::class . '::index');
    }
}
