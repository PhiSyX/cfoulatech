<?php

$user = [
    "firstname" => "Lara",
    "lastname" => "Croft",
    "gender" => "F",
    "dateOfBirth" => "23/10/1995",
    "notes" => [18, 13, 5, 10, 9],
    "city" => "London"
];

$score_notes = 20;

foreach ($user as $key => $value) {
    if ($key == "notes") {
        echo "$key : [";

        foreach ($value as $note) {
            echo "$note/$score_notes ";
        }

        echo "]\n";
    } else {
        echo "$key : $value\n";
    }
}
