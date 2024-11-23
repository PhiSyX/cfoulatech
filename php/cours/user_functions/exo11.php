<?php

function is_women(string $gender): bool
{
	return strtolower($gender) === "femme";
}

function is_adult(int $age): bool
{
	return $age >= 18;
}

/**
 * @param array{age:int,prenom:string,gender:"homme"|"femme"}[] $users
 */
function display_message(array $users)
{
	$user_categories = [
		true => "majeur",
		false => "mineur"
	];

	$user_colors = [
		"homme_majeur" => "crimson",
		"femme_majeur" => "orangered",
		"homme_mineur" => "cadetblue",
		"femme_mineur" => "blueviolet",
	];

	foreach ($users as $user) {
		$user_category = $user_categories[is_adult($user["age"])];
		$user_color = $user_colors[$user["genre"] . "_" . $user_category];

		echo "<p style='color: $user_color'>";
		echo $user["prenom"];
		echo " est un(e) ";
		echo $user["genre"];
		echo " ";
		echo $user_category;
		echo " agé(e) de ";
		echo $user["age"];
		echo " ans.";
		echo "</p>";
	}
}

$users = [
	[
		"prenom" => "Sarah",
		"age" => 35,
		"genre" => "femme",
	],

	[
		"prenom" => "Éric",
		"age" => 15,
		"genre" => "homme",
	],

	[
		"prenom" => "Elisabeth",
		"age" => 17,
		"genre" => "femme",
	],

	[
		"prenom" => "Karim",
		"age" => 45,
		"genre" => "homme",
	]
];

display_message($users);
