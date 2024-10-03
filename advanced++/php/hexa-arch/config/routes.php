<?php

use Framework\Route;
use Framework\Router;
use Infrastructure\Blog\Controller\Admin\CreateArticleController;
use Infrastructure\Blog\Controller\Admin\EditArticleController;
use Infrastructure\Blog\Controller\ListingArticleController;
use Infrastructure\Pages\Controller\HomeController;

return (new Router())
    ->add(
        Route::path("/")
            ->get(HomeController::class, "view")
    )
    ->add(
        Route::path("/blog")
            ->get(ListingArticleController::class, "view")
    )
    ->add(
        Route::path("/admin/blog/article")
            ->get(CreateArticleController::class, "view")
            ->post(CreateArticleController::class, "handle"),
    )
    ->add(
        Route::path("/admin/blog/article/:id")
            ->get(EditArticleController::class, "view")
            ->post(EditArticleController::class, "handle")
    )
;
