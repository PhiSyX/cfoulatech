<?php

namespace App\Controller;

use App\Form\TodoCreateType;
use App\Form\TodoEditType;
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

        $clearTodos = $this->createFormBuilder([])
            ->setAction($this->generateUrl('app_todos_clear'))
            ->setMethod('DELETE')
            ->add('Clear', SubmitType::class, [
                'label' => 'todos.actions.remove_all',
                'attr' => ['class' => 'btn btn-danger'],
            ])
            ->getForm();

        $session = $request->getSession();

        if (!$session->has(self::SESSION_KEY)) {
            $session->set(self::SESSION_KEY, []);
        }

        $todos = $session->get(self::SESSION_KEY);

        return $this->render('todo/index.html.twig', [
            'createTodo' => $createTodo,
            'clearTodos' => $clearTodos,
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

    #[Route('/todos/clear', name: 'app_todos_clear', methods: ['DELETE'])]
    public function clear(Request $request): Response
    {
        $session = $request->getSession();
        $session->remove(self::SESSION_KEY);
        $this->addFlash("info", $this->translator->trans('todos.success.cleared'));
        return $this->redirectToRoute('app_todos');
    }

    #[Route('/todos/{taskName}', name: 'app_todo_edit', methods: ['GET', 'PUT'])]
    public function edit(Request $request, string $taskName): Response
    {
        $session = $request->getSession();

        $todos = $session->get(self::SESSION_KEY);

        if (!isset($todos[$taskName])) {
            throw $this->createNotFoundException(
                $this->translator->trans('todos.error.not_found'),
            );
        }

        $editTodo = $this
            ->createForm(TodoEditType::class, ["todo" => $todos[$taskName]], ['method' => 'PUT'])
            ->handleRequest($request);

        if ($editTodo->isSubmitted() && $editTodo->isValid()) {
            $this->addFlash("success", $this->translator->trans('todos.success.updated', [
                '%taskName%' => $editTodo->get('todo')->getData()
            ]));

            $todos[$taskName] = $editTodo->get('todo')->getData();
            $session->set(self::SESSION_KEY, $todos);
            return $this->redirectToRoute('app_todo_edit', ["taskName" => $taskName]);
        }

        return $this->render('todo/edit.html.twig', [
            'editTodo' => $editTodo,
            'taskName' => $taskName,
        ]);
    }

    #[Route('/todos/{taskName}', name: 'app_todo_remove', methods: ['DELETE'])]
    public function remove(Request $request, string $taskName): Response
    {
        $session = $request->getSession();

        $todos = $session->get(self::SESSION_KEY);

        if (!isset($todos[$taskName])) {
            throw $this->createNotFoundException(
                $this->translator->trans('todos.error.not_found'),
            );
        }

        $todos = array_filter($todos, fn($key) => $key !== $taskName, ARRAY_FILTER_USE_KEY);
        $session->set(self::SESSION_KEY, $todos);

        $this->addFlash("success", $this->translator->trans('todos.success.removed', [
            '%taskName%' => $taskName
        ]));

        return $this->redirectToRoute('app_todos');
    }
}
