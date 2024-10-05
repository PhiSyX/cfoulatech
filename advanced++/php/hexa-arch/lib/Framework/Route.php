<?php

namespace Framework;

class Route
{
    /**
     * @var array<HttpMethod,array{string,string}>
     */
    public array $maps = [];
    public array $args = [];

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

    public function put(string $action, string $handle = "handle"): self
    {
        $this->maps[HttpMethod::PUT->name] = [$action, $handle];
        return $this;
    }

    public function delete(string $action, string $handle = "handle"): self
    {
        $this->maps[HttpMethod::DELETE->name] = [$action, $handle];
        return $this;
    }

    public function eq(string|HttpMethod $p)
    {
        if (!is_string($p)) {
            return array_key_exists($p->name, $this->maps);
        }

        $f = rtrim($p, '/') === rtrim($this->url_path, '/');

        if ($f) {
            return true;
        }

        $args = &$this->args;
        $repl = function ($matches) use (&$args) {
            [$placeholder] = $matches;
            $args[] = substr($placeholder, 1);
            return "([a-zA-Z0-9-_]+)";
        };

        $regexp = preg_replace_callback("/:\w+/", $repl, $this->url_path);
        $regexp = str_replace("/", "\\/", $regexp);

        $matches = [];
        $size = preg_match_all("/^" . $regexp . "$/", $p, $matches);

        if (!$size) {
            return $f;
        }

        array_shift($matches);

        foreach ($matches as $key => $values) {
            [$value] = $values;
            $placeholder = $this->args[$key];
            $this->args[$placeholder] = $value;
        }

        return true;
    }
}
