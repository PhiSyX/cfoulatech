<?php

namespace Domain\Blog\Action;

use Domain\Blog\Repository\ArticleRepository;

/**
 * Action de récupération d'un article.
 */

class ShowArticleAction
{
    /**
     * Notre action a besoin de l'interface ArticleRepository de notre domaine.
     *
     * L'injecteur de dépendance va automatiquement injecter la bonne classe
     * concrète, si elle existe. Dans le cas contraire, une erreur se produira.
     */
    public function __construct(protected ArticleRepository $article_repository) {}

    /**
     * Récupère un article e fonction de l'ID.
     */
    public function get(int $id)
    {
        return $this->article_repository->get($id);
    }
}
