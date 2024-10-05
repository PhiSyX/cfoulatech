<?php

namespace Domain\Blog\Action;

/**
 * Action de suppression d'un article.
 */

class DeleteArticleAction extends ShowArticleAction
{
    /**
     * Action de suppression.
     */
    public function delete(int $id)
    {
        $this->article_repository->delete($id);
    }
}
