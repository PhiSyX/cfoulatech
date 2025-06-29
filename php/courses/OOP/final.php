<?php

/**
 * Nous ne pouvons pas faire hériter une classe définie en final.
 */

final class ExempleFinalHello
{
}

//
// Fatal error: Class Hello cannot extend final class World in final.php on line 13/14
//
//class ExampleFinalHello1 extends ExempleFinalHello {}
//final class ExampleFinalHello2 extends ExempleFinalHello {}

$w = new ExempleFinalHello();
var_dump($w);
