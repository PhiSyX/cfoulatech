<?php

namespace Infrastructure\Blog\Controller;

use Domain\Blog\Repository\ArticleRepository;
use Framework\Controller;

class ListingArticleController extends Controller
{
    public function __construct(private ArticleRepository $repository) {}

    /**
     * GET Handler
     */
    public function view()
    {
        $articles = $this->repository->all();
        return $this->render("blog/listing_article", ["articles" => $articles]);
    }
}
