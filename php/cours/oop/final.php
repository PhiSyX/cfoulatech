<?php

/**
 * Nous ne pouvons pas faire hériter une classe désigner en final.
 */

final class World {}

// 
// Fatal error: Class Hello cannot extend final class World in final.php on line 13/14
// 
//class Hello extends World {}
//final class Hello extends World {}

$w = new World();
var_dump($w);
