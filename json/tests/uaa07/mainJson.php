<?php

require "./Film.php";
require "./Acteur.php";

// Partie 3

$acteurs_file = file_get_contents("acteurs.json");
if ($acteurs_file === false) {
	die("Erreur de lecture du fichier JSON.");
}
$acteurs_json = json_decode($acteurs_file);
if (json_last_error() !== JSON_ERROR_NONE) {
	die("Erreur de décodage JSON : " . json_last_error_msg());
}

$acteurs = [];

foreach ($acteurs_json as $acteur_json) {
	$acteur_film = (new Film())
		->setTitre($acteur_json->film->titre)
		->setNote($acteur_json->film->note)
		->setDate(new \DateTime($acteur_json->film->date_sortie))
		->setGenres($acteur_json->film->genres)
		->setEnSalle($acteur_json->film->enSalle)
		->setLangues($acteur_json->film->langues);

	$acteur = (new Acteur($acteur_json->id))
		->setNom($acteur_json->nom)
		->setEmail($acteur_json->email)
		->setSite($acteur_json->site)
		->setNationalite($acteur_json->nationalite)
		->setGenre($acteur_json->genre)
		->setAge($acteur_json->age)
		->setFilm($acteur_film);

	$acteurs[] = $acteur;
}

foreach ($acteurs as $acteur) {
	echo $acteur;
}

// Partie 5

echo "<hr>";

try {
	$pdo = new PDO("mysql:host=localhost;dbname=uaa_acteurs_db", "root", "");
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
} catch (PDOException $e) {
	die("Erreur de connexion: " . $e->getMessage());
}

try {
	$stmt = $pdo->prepare(
		"INSERT INTO acteurs
		(id, nom, email, site, nationalite, genre, age, film)
		VALUES
		(:id, :nom, :email, :site, :nationalite, :genre, :age, :film)
	");

	foreach ($acteurs as $acteur) {
		$success = $stmt->execute([
			"id"			=> $acteur->getId(),
			"nom"			=> $acteur->getNom(),
			"email"			=> $acteur->getEmail(),
			"site"			=> $acteur->getSite(),
			"nationalite"		=> $acteur->getNationalite(),
			"genre"			=> $acteur->getGenre(),
			"age"			=> $acteur->getAge(),
			"film"			=> $acteur->getFilm()->getTitre(),
		]);

		if ($success) {
			echo "L'acteur " . $acteur->getNom() . " a bien été ajouté avec son film « " . $acteur->getFilm()->getTitre() . " » en base de données <br>";
		}
	}
} catch (PDOException $pdo) {
	die("Erreur lors de l'insertion de l'acteur : " . $pdo->getMessage());
}
