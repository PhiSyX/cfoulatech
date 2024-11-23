<?php

namespace Domain\Blog\Action;

use Domain\Blog\DTO\EditArticleDTO;

/**
 * Action d'édition d'un article.
 */

class EditArticleAction extends ShowArticleAction
{
	/**
	 * Action de sauvegarde.
	 */
	public function save(EditArticleDTO $dto)
	{
		// TODO: Valider les données...
		$article = $dto->to_entity();
		$this->article_repository->update($article);
	}
}
