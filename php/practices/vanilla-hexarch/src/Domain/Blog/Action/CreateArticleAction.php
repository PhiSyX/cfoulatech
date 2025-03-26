<?php

namespace Domain\Blog\Action;

use Domain\Blog\DTO\CreateArticleDTO;
use Domain\Blog\Repository\ArticleRepository;

/**
 * Action de créer un article.
 */

class CreateArticleAction
{
	/**
	 * Notre action a besoin de l'interface ArticleRepository de notre domaine.
	 *
	 * L'injecteur de dépendance va automatiquement injecter la bonne classe
	 * concrète, si elle existe. Dans le cas contraire, une erreur se produira.
	 */
	public function __construct(private ArticleRepository $article_repository) {}

	/**
	 * Action de sauvegarde.
	 */
	public function save(CreateArticleDTO $dto)
	{
		// TODO: Valider les données...
		$article = $dto->to_entity();
		$this->article_repository->insert($article);
	}
}
