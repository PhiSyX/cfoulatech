<?php

require_once __DIR__ . "/../utils/instruction.php";

// 1. Affichez les prénoms les-uns en dessous des autres manuellement.
echo instruction(
    "Affichez les prénoms les-uns en dessous des autres manuellement.",
    output: true,
);

$user1 = "Mike";
$user2 = "Say";
$user3 = "Erica";
$user4 = "Jérémie";
$user5 = "Timothy";
$user6 = "Maxime";
$user7 = "Carina";
$user8 = "Zakaria";
$user9 = "Clovis";
$user10 = "Mohamed-Ali";

echo "Le prénom est $user1 \n";
echo "Le prénom est $user2 \n";
echo "Le prénom est $user3 \n";
echo "Le prénom est $user4 \n";
echo "Le prénom est $user5 \n";
echo "Le prénom est $user6 \n";
echo "Le prénom est $user7 \n";
echo "Le prénom est $user8 \n";
echo "Le prénom est $user9 \n";
echo "Le prénom est $user10 \n";
