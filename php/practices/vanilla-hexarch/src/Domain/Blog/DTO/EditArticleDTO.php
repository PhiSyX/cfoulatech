<?php

namespace Domain\Blog\DTO;

use Domain\Blog\Article;

class EditArticleDTO
{
	public function __construct(
		public int $id,
		public string $title,
		public string $content,
		public bool $publish_now
	) {}

	public function to_entity()
	{
		return Article::from_edit_dto($this);
	}
}
