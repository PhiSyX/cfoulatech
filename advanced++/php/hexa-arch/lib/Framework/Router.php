<?php

namespace Framework;

class Router
{
    /**
     * @var array<HttpMethod,Route[]>
     */
    public array $routes = [
        HttpMethod::GET->name    => [],
        HttpMethod::POST->name   => [],
        HttpMethod::PUT->name    => [],
        HttpMethod::DELETE->name => [],
        HttpMethod::PATCH->name  => [],
    ];

    /**
     * Ajoute une route à la liste des routes.
     */
    public function add(Route $route): self
    {
        foreach ($route->maps as $verb => $_) {
            array_push($this->routes[$verb], $route);
        }

        return $this;
    }

    /**
     * Récupère une route en fonction de la méthode, et de l'URL de la liste des
     * routes.
     * 
     * @return ?array{string,string}
     */
    public function get(HttpMethod $method, string $url_path): ?array
    {
        foreach ($this->routes as $routes) {
            foreach ($routes as $route) {
                if (!($route->eq($method) && $route->eq($url_path))) {
                    continue;
                }

                unset($route->args[0]);
                $args = $route->args;
                return [...$route->maps[$method->name], $args];
            }
        }

        return null;
    }

    /**
     * Vérifie qu'une route en fonction de la méthode, et de l'URL existe dans
     * la liste des routes.
     */
    public function has(HttpMethod $method, string $url_path): bool
    {
        if (!array_key_exists($method->name, $this->routes)) {
            return false;
        }

        if (!array_key_exists($url_path, $this->routes[$method->name])) {
            return false;
        }

        return true;
    }
}
