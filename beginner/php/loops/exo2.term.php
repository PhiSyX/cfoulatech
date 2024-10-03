<?php

$user_number = (int) readline("Entrez un nombre entre 0 et 10 pour gagner un lot : ");
$winning_number = rand(0, 10);

while ($user_number !== $winning_number) {
    echo "Mauvais numéro, vous n'avez pas gagné !\n";
    $user_number = (int) readline("Retentez votre chance, entrez un nombre à nouveau : ");
}

echo "Bravo !!! \n";
echo "Vous avez enfin trouvé le numéro gagnant !\n";
echo "C'était bien le numéro $winning_number :-)";
