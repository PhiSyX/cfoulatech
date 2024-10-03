<?php

namespace Framework;

class Route
{
    /**
     * @var array<HttpMethod,array{string,string}>
     */
    public array $maps = [];

    // ----------- //
    // Constructor //
    // ----------- //

    public function __construct(public string $url_path) {}

    public static function path(string $url_path): self
    {
        $route = new Route($url_path);
        return $route;
    }

    public function get(string $action, string $handle = "handle"): self
    {
        $this->maps[HttpMethod::GET->name] = [$action, $handle];
        return $this;
    }

    public function post(string $action, string $handle = "handle"): self
    {
        $this->maps[HttpMethod::POST->name] = [$action, $handle];
        return $this;
    }

    public function eq(string|HttpMethod $p)
    {
        if (!is_string($p)) {
            return array_key_exists($p->name, $this->maps);
        }

        return rtrim($p, '/') === rtrim($this->url_path, '/');
    }
}
