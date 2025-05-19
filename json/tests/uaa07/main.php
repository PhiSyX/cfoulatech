<?php

require "./Film.php";
require "./Acteur.php";

// Partie 4

header("Content-Type: application/json");

$newActeurs = [
	(new Acteur(10))
		->setNom("Jean-Claude Van Damme")
		->setEmail("jean@jcvd.be")
		->setSite("https://jcvd.be")
		->setNationalite("Belge")
		->setGenre("M")
		->setAge(64)
		->setFilm((new Film())
			->setTitre("Le Jardinier")
			->setNote(1.3)
			->setDate(new DateTime("2025-01-10"))
			->setGenres(["Comédie d'action"])
			->setEnSalle(true)
			->setLangues(["français"])),
	(new Acteur(11))
		->setNom("Pierre Niney")
		->setEmail("pierre@niney.fr")
		->setSite("https://pierreniney.fr")
		->setNationalite("Français")
		->setGenre("M")
		->setAge(36)
		->setFilm((new Film())
			->setTitre("Le Comte de Monte-Cristo")
			->setNote(4.5)
			->setDate(new DateTime("2024-06-28"))
			->setGenres(["Action", "Drame", "Aventure"])
			->setEnSalle(true)
			->setLangues(["français"])),
];

echo json_encode($newActeurs);
