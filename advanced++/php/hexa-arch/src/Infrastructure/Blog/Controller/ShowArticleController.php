<?php

namespace Infrastructure\Blog\Controller;

use Domain\Blog\Repository\ArticleRepository;
use Framework\Controller;
use Framework\Request;

class ShowArticleController extends Controller
{
    public function __construct(private ArticleRepository $repository) {}

    public function view(Request $req, string $id, string $slug)
    {
        $article = $this->repository->find_by_id($id);
        return $this->render("blog/show_article", ["article" => $article]);
    }
}
