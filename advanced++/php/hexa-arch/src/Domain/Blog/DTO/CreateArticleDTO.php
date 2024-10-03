<?php

namespace Domain\Blog\DTO;

use Domain\Blog\Article;

class CreateArticleDTO
{
    public function __construct(
        public string $title,
        public string $content,
        public bool $publish_now
    ) {}

    public function to_entity()
    {
        return Article::from_create_dto($this);
    }
}
