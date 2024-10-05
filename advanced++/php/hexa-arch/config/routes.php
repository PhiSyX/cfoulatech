<?php

use Framework\Route;
use Framework\Router;
use Infrastructure\Blog\Controller\Admin\CreateArticleController;
use Infrastructure\Blog\Controller\Admin\DeleteArticleController;
use Infrastructure\Blog\Controller\Admin\EditArticleController;
use Infrastructure\Blog\Controller\Admin\ListingArticleController;
use Infrastructure\Blog\Controller\Admin\ShowArticleController;
use Infrastructure\Pages\Controller\HomeController;

return (new Router())
    ->add(
        Route::path("/")
            ->get(HomeController::class, "view")
    )
    ->add(
        Route::path("/admin/blog/article")
            ->get(ListingArticleController::class, "view")
            ->post(CreateArticleController::class, "handle"),
    )
    ->add(
        Route::path("/admin/blog/article/create")
            ->get(CreateArticleController::class, "view")
    )
    ->add(
        Route::path("/admin/blog/article/edit/:id")
            ->get(EditArticleController::class, "view")
    )
    ->add(
        Route::path("/admin/blog/article/:id")
            ->get(ShowArticleController::class, "view")
            ->delete(DeleteArticleController::class, "handle")
            ->put(EditArticleController::class, "handle")
    )
;
