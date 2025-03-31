<?php

/**
 * Nous ne pouvons pas faire hériter une classe définie en final.
 */

final class WorldFinal {}

//
// Fatal error: Class Hello cannot extend final class World in final.php on line 13/14
//
//class ExampleFinalHello1 extends WorldFinal {}
//final class ExampleFinalHello2 extends WorldFinal {}

$w = new World();
var_dump($w);
