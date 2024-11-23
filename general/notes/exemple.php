<?php

$classe = [
    [
        "prenom" => "Julien",
        "nom" => "Dunia",
        "notes" => [8, 15, 12]
    ],
    [
        "prenom" => "Hakima",
        "nom" => "Darmouch",
        "notes" => [18, 5, 10]
    ],
    [
        "prenom" => "Christian",
        "nom" => "Bale",
        "notes" => [7, 19, 5]
    ]
];

foreach ($classe as $eleve) {

    foreach ($eleve as $eleve_cle => $eleve_valeur) {
        if ($eleve_cle === "notes" && is_array($eleve_valeur)) {
            $notes = $eleve_valeur;

            $somme = 0;

            foreach ($notes as $note) {
                $somme += $note;
            }

            $taille_notes = count($notes);

            $moyenne = $somme / $taille_notes;

            echo "$eleve_cle : Moyenne $moyenne \n";
        } else {
            echo "$eleve_cle : $eleve_valeur \n";
        }
    }

    echo "\n";
}
