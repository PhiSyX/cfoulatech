<?php

// require __DIR__ . "/azertyuiopqsdfghj.php";

// Le script ne va pas executer le reste du fichier, quand le fichier n'est pas
// trouvé par le require ci-haut.

require __DIR__ . "/fns.php";

echo "Hello\n";

$result = add(7, 2); // 3.5
echo "La réponse de l'addition est $result\n";
