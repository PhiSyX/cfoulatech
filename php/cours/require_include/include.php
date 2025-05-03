<?php

// include __DIR__ . "/azertyuiopqsdfghj.php";

// Le script va executer le reste du fichier, même si le fichier n'est pas
// trouvé par l'include ci-haut.

include __DIR__ . "/fns.php";

echo "Hello\n";

$result = add(7, 2); // 3.5
echo "La réponse de l'addition est $result\n";
