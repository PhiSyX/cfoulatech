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
        return array_map(fn($item) => new Article(
            $item->title,
            $item->content,
            id: $item->id,
            created_at: DateTime::createFromFormat("Y-m-d h:i:s", $item->created_at),
            updated_at: DateTime::createFromFormat("Y-m-d h:i:s", $item->updated_at),
            published_at: DateTime::createFromFormat("Y-m-d h:i:s", $item->published_at),
        ), $this->db->fetch_all("SELECT * FROM articles", Article::class));
    }

    public function insert(Article $entity): void
    {
        $this->db->insert(
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
}
