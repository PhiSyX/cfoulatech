<?php

namespace Infrastructure\Blog\Controller\Admin;

use Domain\Blog\Action\ListArticleAction;
use Domain\Blog\Repository\ArticleRepository;
use Framework\Controller;

class ListingArticleController extends Controller
{
	private ListArticleAction $action;

	public function __construct(ArticleRepository $article_repository)
	{
		$this->action = new ListArticleAction($article_repository);
	}

	/**
	 * GET Handler
	 */
	public function view()
	{
		$articles = $this->action->all();
		return $this->render("blog/admin/listing_article", ["articles" => $articles]);
	}
}
