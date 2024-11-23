<?php

namespace Infrastructure\Blog\Controller\Admin;

use Domain\Blog\Action\EditArticleAction;
use Domain\Blog\DTO\EditArticleDTO;
use Domain\Blog\Repository\ArticleRepository;
use Framework\Controller;
use Framework\Request;

class EditArticleController extends Controller
{
    private EditArticleAction $action;

    public function __construct(ArticleRepository $article_repository)
    {
        $this->action = new EditArticleAction($article_repository);
    }

    /**
     * GET handler
     */
    public function view(Request $req, int $id)
    {
        $article = $this->action->get($id);
        return $this->render("blog/admin/edit_article", ["article" => $article]);
    }

    /**
     * PUT handler
     */
    public function handle(Request $req, int $id)
    {
        $edit_article_dto = new EditArticleDTO(
            $id,
            $req->field("title"),
            $req->field("content"),
            (bool) $req->field("publish_now") ?: false,
        );

        $this->action->save($edit_article_dto);

        return $this->redirect_back();
    }
}
