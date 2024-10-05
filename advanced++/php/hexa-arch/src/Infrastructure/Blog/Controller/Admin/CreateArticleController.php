<?php

namespace Infrastructure\Blog\Controller\Admin;

use Domain\Blog\Action\CreateArticleAction;
use Domain\Blog\DTO\CreateArticleDTO;
use Domain\Blog\Repository\ArticleRepository;
use Framework\Controller;
use Framework\Request;

class CreateArticleController extends Controller
{
    private CreateArticleAction $action;

    public function __construct(ArticleRepository $article_repository)
    {
        $this->action = new CreateArticleAction($article_repository);
    }

    /**
     * GET Handler
     */
    public function view()
    {
        return $this->render("blog/admin/create_article");
    }

    /**
     * POST Handler
     */
    public function handle(Request $req)
    {
        $create_article_dto = new CreateArticleDTO(
            $req->field("title"),
            $req->field("content"),
            (bool) $req->field("publish_now") ?: false,
        );

        $this->action->save($create_article_dto);

        return $this->redirect("/admin/blog/article");
    }
}
