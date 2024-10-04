<?php

require_once __DIR__ . "/../utils/instruction.php";

// 1. Affichez les prénoms les-uns en dessous des autres manuellement.
echo instruction(
    "Affichez les prénoms les-uns en dessous des autres manuellement.",
    output: true,
);

$user1 = "Julien";
$user2 = "Mike";
$user3 = "Say";
$user4 = "Jérémie";
$user5 = "Erica";
$user6 = "Timothy";
$user7 = "Zakaria";
$user8 = "Maxime";
$user9 = "Clovis";
$user10 = "Mohamed-Ali";

echo $user1 . "\n";
echo $user2 . "\n";
echo $user3 . "\n";
echo $user4 . "\n";
echo $user5 . "\n";
echo $user6 . "\n";
echo $user7 . "\n";
echo $user8 . "\n";
echo $user9 . "\n";
echo $user10 . "\n";
