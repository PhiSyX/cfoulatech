<?php

namespace Infrastructure\Blog\Controller\Admin;

use Domain\Blog\Action\DeleteArticleAction;
use Domain\Blog\Repository\ArticleRepository;
use Framework\Controller;
use Framework\Request;

class DeleteArticleController extends Controller
{
	private DeleteArticleAction $action;

	public function __construct(ArticleRepository $article_repository)
	{
		$this->action = new DeleteArticleAction($article_repository);
	}

	/**
	 * DELETE handler
	 */
	public function handle(Request $req, int $id)
	{
		$this->action->delete($id);
		return $this->redirect("/admin/blog/article");
	}
}
