<?php

require __DIR__ . "/../utils/instruction.php";

$class = [
	[
		"firstname" => "Julien",
		"lastname" => "Dunia",
		"notes" => [8, 15, 12],
	],
	[
		"firstname" => "Hakima",
		"lastname" => "Darmouch",
		"notes" => [18, 5, 10],
	],
	[
		"firstname" => "Christian",
		"lastname" => "Bale",
		"notes" => [7, 19, 5],
	],
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
