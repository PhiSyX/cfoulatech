<?php

namespace Framework;

class Request
{
    /**
     * Méthode de la requête en cours.
     */
    public function method(): HttpMethod
    {
        if ($this->field("_method")) {
            return HttpMethod::from($this->field("_method"));
        }
        return HttpMethod::from($_SERVER["REQUEST_METHOD"]);
    }

    /**
     * Récupère un paramètre d'URL via $_GET 
     */
    public function search(string $name): ?string
    {
        return filter_input(INPUT_GET, $name);
    }

    /**
     * Récupère un paramètre de formulaire via $_POST
     */
    public function field(string $name): ?string
    {
        return filter_input(INPUT_POST, $name);
    }
}
