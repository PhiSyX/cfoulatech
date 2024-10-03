<?php

namespace Infrastructure\Blog\Controller\Admin;

use Domain\Blog\Repository\ArticleRepository;
use Framework\Controller;

class EditArticleController extends Controller
{
    public function __construct(private ArticleRepository $repository) {}

    public function view() {}
}
