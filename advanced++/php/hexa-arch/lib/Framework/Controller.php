<?php

namespace Framework;

class Controller {
    /**
     * Rend une vue du répertoire `templates` située à la racine du projet.
     * 
     * La vue a accès à la variable `$payload`.
     */
    public function render(string $name, ?array $payload = [])
    {
        ob_start();
        require_once __DIR__ . "/../../templates/$name.html.php";
        $temp = ob_get_clean();
        return $temp;
    }
}