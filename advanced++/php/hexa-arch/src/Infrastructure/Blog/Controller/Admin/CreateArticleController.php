<?php

namespace Infrastructure\Blog\Controller\Admin;

use Domain\Blog\Action\CreateArticleAction;
use Domain\Blog\DTO\CreateArticleDTO;
use Domain\Blog\Repository\ArticleRepository;
use Framework\Controller;
use Framework\Request;

class CreateArticleController extends Controller
{
    public function __construct(private ArticleRepository $article_repository) {}

    /**
     * GET Handler
     */
    public function view()
    {
        return $this->render("blog/create_article");
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

        $action = new CreateArticleAction($this->article_repository);
        $action->save($create_article_dto);
    }
}
