<?php

namespace Infrastructure\Blog\Repository;

use DateTime;
use Domain\Blog\Article;
use Domain\Blog\Repository\ArticleRepository;
use Framework\Database;

class MySQLArticleRepository implements ArticleRepository
{
    private Database $db;

    public function __construct()
    {
        $this->db = Database::singleton();
    }

    public function all(): array
    {
        $rows = $this->db->fetch_all("SELECT * FROM articles");

        return array_map(fn($item) => new Article(
            $item->title,
            $item->content,
            id: $item->id,
            created_at: DateTime::createFromFormat("Y-m-d h:i:s", $item->created_at),
            updated_at: DateTime::createFromFormat("Y-m-d h:i:s", $item->updated_at),
            published_at: $item->published_at ? DateTime::createFromFormat("Y-m-d h:i:s", $item->published_at) : null,
        ), $rows);
    }

    function delete(int $id): bool
    {
        return $this->db->delete("DELETE FROM articles WHERE id = :id", ["id" => $id]);
    }

    function get(int $id): ?Article
    {
        $row = $this->db->fetch_one("SELECT * FROM articles WHERE id = :id", ["id" => $id]);
        $entity = new Article(
            title: $row->title,
            content: $row->content,
            id: $row->id,
            created_at: DateTime::createFromFormat("Y-m-d h:i:s", $row->created_at),
            updated_at: DateTime::createFromFormat("Y-m-d h:i:s", $row->updated_at),
            published_at: $row->published_at ? DateTime::createFromFormat("Y-m-d h:i:s", $row->published_at) : null,
        );
        return $entity;
    }

    function insert(Article $entity): bool
    {
        return $this->db->insert(
            "INSERT INTO articles (title,content,created_at,updated_at,published_at) VALUES (:title,:content,:created_at,:updated_at,:published_at)",
            [
                "title" => $entity->title,
                "content" => $entity->content,
                "created_at" => $entity->created_at->format("Y-m-d h:i:s"),
                "updated_at" => $entity->updated_at->format("Y-m-d h:i:s"),
                "published_at" => $entity->published_at?->format("Y-m-d h:i:s"),
            ],
        );
    }

    function update(Article $entity): bool
    {
        return $this->db->update(
            "UPDATE articles SET title = :title, content = :content, updated_at = :updated_at , published_at = :published_at WHERE id = :id",
            [
                "id" => $entity->id,
                "title" => $entity->title,
                "content" => $entity->content,
                "updated_at" => $entity->updated_at->format("Y-m-d h:i:s"),
                "published_at" => $entity->published_at?->format("Y-m-d h:i:s"),
            ],
        );
    }
}
