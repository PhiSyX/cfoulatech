<?php

function is_women(string $gender): bool
{
	return strtolower($gender) === "femme";
}

function is_adult(int $age): bool
{
	return $age >= 18;
}

function feminize_word(string $gender, string $text): string
{
	$féminin = "e";

	if (is_women($gender) && !str_ends_with($text, $féminin)) {
		return $text . $féminin;
	}

	return $text;
}

/**
 * @param array{age:int,prenom:string,gender:"homme"|"femme"}[] $users
 */
function display_message(array $users): void
{
	$user_categories = [
		true => "adulte",
		false => "mineur"
	];

	$user_civilities = [
		"femme_adulte" => "Madame",
		"homme_adulte" => "Monsieur",
		"femme_mineur" => "Mademoiselle",
		"homme_mineur" => "",
	];

	$user_colors = [
		"homme_adulte" => "crimson",
		"femme_adulte" => "orangered",
		"homme_mineur" => "cadetblue",
		"femme_mineur" => "blueviolet",
	];

	foreach ($users as $user) {
		$user_category = $user_categories[is_adult($user["age"])];
		$user_gender_key = $user["genre"] . '_' . $user_category;
		$user_civility = $user_civilities[$user_gender_key];
		$couleur_genre = $user_colors[$user_gender_key];

		echo "<p style='color: $couleur_genre'>";
		echo "Bonjour $user_civility ";
		echo $user["prenom"];
		echo ", vous êtes ";
		echo feminize_word($user["genre"], "un");
		echo " ";
		echo feminize_word($user["genre"], $user_category);
		echo " ";
		echo feminize_word($user["genre"], "âgé");
		echo " de ";
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
