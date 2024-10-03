<?php

namespace Domain\Blog;

use DateTime;
use Domain\Blog\DTO\CreateArticleDTO;

class Article
{
    public function __construct(
        public string $title,
        public string $content,
        public ?int $id = null,
        public ?DateTime $created_at = null,
        public ?DateTime $updated_at = null,
        public ?DateTime $published_at = null,
    ) {}

    public static function from_create_dto(CreateArticleDTO $dto)
    {
        return new Article(
            $dto->title,
            $dto->content,
            created_at: new DateTime(),
            updated_at: new DateTime(),
            published_at: $dto->publish_now ? new DateTime() : null,
        );
    }

    /**
     * Crée un slug simple basé sur le titre de l'article.
     */
    public function slug()
    {
        $title = strtolower($this->title);
        return str_replace([' ', '_'], '-', $title);
    }
}
