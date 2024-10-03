<?php

namespace Domain\Blog\Repository;

use Domain\Blog\Article;

interface ArticleRepository
{
    /**
     * Récupère tous les articles.
     * 
     * @return Article[]
     */
    function all(): array;

    /**
     * Trouve un article en fonction de l'ID
     */
    function find_by_id(string $id): ?Article;

    /**
     * Insère un nouvel article.
     */
    function insert(Article $entity): void;
}
