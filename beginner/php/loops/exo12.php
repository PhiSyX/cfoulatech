<?php

require __DIR__ . "/../utils/instruction.php";

/**
 * Pour cet exercice je n'utilise que des boucles "POUR CHAQUE" (foreach).
 * 
 * Les étapes:
 *
 * 1. Je crée une boucle foreach dollar $class as dollar $élève
 * 2. A l'intérieur de la première boucle, je crée une nouvelle boucle foreach
 *    dollar $élève où je récupère sa clé (dollar $élève_cle) et sa valeur
 *    (dollar $élève_valeur)
 *
 * 3. Je vérifie que la clé dollar $élève_cle est "notes" et que sa valeur est
 *    un tableau via la fonction `is_array(dollar $élève_valeur)`.
 *
 *    3.1. Je crée une variable dollar $notes à laquelle j'attribue la valeur
 *         dollar $élève_valeur.
 *
 *    3.2. Je crée une variable dollar $somme à laquelle j'attribute la valeur
 *         `0`.
 *
 *    3.4. Je crée une boucle "POUR CHAQUE" (foreach), dollar $notes as dollar
 *    $note
 *
 *      3.4.1. J'ajoute dollar $note à la variable dollar $somme via l'opérateur
 *             d'affection arithmétique après addition.
 *
 *      3.4.2. Je crée une variable dollar $moyenne.
 * 
 *      3.4.3. J'affiche dollar $élève_cle . " : Moyenne " . dollar $moyenne;
 * 
 * 4. Je crée une condition SINON (else) 
 *      4.1. J'affiche dollar $élève_cle . " : " . $élève_valeurs;
 * 
 * 5. J'affiche une fin de ligne à la fin de la première boucle.
 */

$class = [
    [
        "firstname" => "Julien",
        "lastname" => "Dunia",
        "notes" => [8, 15, 12]
    ],
    [
        "firstname" => "Hakima",
        "lastname" => "Darmouch",
        "notes" => [18, 5, 10]
    ],
    [
        "firstname" => "Christian",
        "lastname" => "Bale",
        "notes" => [7, 19, 5]
    ]
];

echo instruction("
    Afficher tous les éléments de cette classe d'élèves.
    Calculer la moyenne des notes des élèves.
", data: $class, output: true);

foreach ($class as $student) {
    foreach ($student as $student_key => $student_value) {
        if ($student_key === "notes" && is_array($student_value)) {
            $notes = $student_value;

            $sum = 0;
            foreach ($notes as $note) {
                $sum += $note;
            }

            $total_notes = count($notes);

            $average = $sum / $total_notes;

            echo "$student_key : Moyenne $average" . PHP_EOL;
        } else {
            echo "$student_key : $student_value" . PHP_EOL;
        }
    }

    echo PHP_EOL;
}
