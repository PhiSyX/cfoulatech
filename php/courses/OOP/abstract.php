<?php

/**
 * Nous ne pouvons pas créer de nouvelles instances avec une classe abstraite.
 */

abstract class WorldAbstract
{
    abstract public function hello(string $name = "World"): void;

    public function world(string $prefixWord): string
    {
        return "$prefixWord World\n";
    }
}

class ExempleAbstractHello1 extends WorldAbstract
{
    public function hello(string $name = "World"): void
    {
        echo "Hello $name\n";
    }
}

/**
Fatal error: Uncaught Error: Cannot instantiate abstract class World in abstract.php on line 30

Error: Cannot instantiate abstract class World in abstract.php on line 30
 */
//$w = new World();
//$w->hello();
//echo $w->world("Hello");

$h = new ExempleAbstractHello1();
$h->hello(); // Hello World
echo $h->world("Hello"); // Hello World
