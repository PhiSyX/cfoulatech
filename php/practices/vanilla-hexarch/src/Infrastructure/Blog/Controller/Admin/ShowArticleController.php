<?php

namespace Infrastructure\Blog\Controller\Admin;

use Domain\Blog\Action\ShowArticleAction;
use Domain\Blog\Repository\ArticleRepository;
use Framework\Controller;
use Framework\Request;

class ShowArticleController extends Controller
{
	private ShowArticleAction $action;

	public function __construct(ArticleRepository $article_repository)
	{
		$this->action = new ShowArticleAction($article_repository);
	}

	public function view(Request $req, int $id)
	{
		$article = $this->action->get($id);
		return $this->render("blog/admin/show_article", ["article" => $article]);
	}
}
