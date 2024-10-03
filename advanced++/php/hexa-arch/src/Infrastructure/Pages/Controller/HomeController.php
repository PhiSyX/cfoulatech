<?php

namespace Infrastructure\Pages\Controller;

use Framework\Controller;

class HomeController extends Controller
{
    public function view()
    {
        return $this->render("pages/home");
    }
}
