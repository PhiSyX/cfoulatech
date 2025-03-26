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
	 * Supprime un article en fonction d'un ID.
	 */
	function delete(int $id): bool;

	/**
	 * Récupère un article en fonction de l'ID
	 */
	function get(int $id): ?Article;

	/**
	 * Insère un nouvel article.
	 */
	function insert(Article $entity): bool;

	/**
	 * Met à jour un article.
	 */
	function update(Article $entity): bool;
}
