<?php

namespace Domain\Blog\Action;

use Domain\Blog\Repository\ArticleRepository;

class ListArticleAction
{
    public function __construct(private ArticleRepository $article_repository) {}

    public function all()
    {
        return $this->article_repository->all();
    }
}
