<?php

// Partie 1 PDO

// 2
try {
	$pdo = new PDO('mysql:dbname=cfitech_mobile;host=localhost', 'root', '');
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
} catch (PDOException $e) {
	die('Erreur de connexion: ' . $e->getMessage());
}

// 3
try {
	$req = $pdo->prepare("
		INSERT INTO smartphones (nom, marque, est_allume, annee)
		VALUES (:nom, :marque, :allume, :annee)
	");

	$smartphones = [
		[
			"nom" => "Galaxy S10",
			"marque" => "Samsung",
			"allume" => 0,
			"annee" => 2019,
		],
		[
			"nom" => "Pro Max 15",
			"marque" => "One Plus",
			"allume" => 0,
			"annee" => 2023,
		],
		[
			"nom" => "Z Flip 4",
			"marque" => "Samsung",
			"allume" => 0,
			"annee" => 2022,
		],
		[
			"nom" => "Bold",
			"marque" => "BlackBerry",
			"allume" => 0,
			"annee" => 2010,
		],
	];

	foreach ($smartphones as $smartphone) {
		if ($req->execute($smartphone)) {
			echo "Un nouveau smartphone : " . $smartphone["marque"] . " " . $smartphone["nom"] . " a été ajouté\n";
		}
	}
} catch (PDOException $e) {
	die("Erreur d'insertion (3): " . $e->getMessage());
}

// 4
try {
	$req = $pdo->query("SELECT * FROM smartphones");
	foreach ($req->fetchAll() as $smartphone) {
		$text = "Voici le smartphone " . $smartphone->id_smartphone . "\n";
		$text .= "Marque : " . $smartphone->marque . "\n";
		$text .= "Nom : " . $smartphone->nom . "\n";
		$text .= "Année : " . $smartphone->annee . "\n";
		$text .= "\n\n";
		echo $text;
	}
} catch (PDOException $e) {
	die("Erreur de sélection (4): " . $e->getMessage());
}

// 5
try {
	$req = $pdo->prepare(
		"UPDATE smartphones SET marque = :marque WHERE id_smartphone = 2",
	);
	$req->execute(["marque" => "iPhone"]);

	$req = $pdo->query("SELECT * FROM smartphones WHERE id_smartphone = 2");
	$smartphone = $req->fetch();

	$text = "Voici le smartphone " . $smartphone->id_smartphone . "\n";
	$text .= "Marque : " . $smartphone->marque . "\n";
	$text .= "Nom : " . $smartphone->nom . "\n";
	$text .= "Année : " . $smartphone->annee . "\n";
	$text .= "\n\n";
	echo $text;
} catch (PDOException $e) {
	die("Erreur de mise à jour (5): " . $e->getMessage());
}

// 6
try {
	$req = $pdo->prepare("
		INSERT INTO smartphones (nom, marque, est_allume, annee)
		VALUES (:nom, :marque, :allume, :annee)
	");
	if ($req->execute([
		"nom" => "X",
		"marque" => "iPhone",
		"allume" => 1,
		"annee" => 2015,
	])) {
		echo "Mon smartphone iPhone X a été ajouté\n";
	}

	$req = $pdo->prepare("DELETE FROM smartphones WHERE id_smartphone = :smartphone");
	if ($req->execute(['smartphone' => 4])) {
		echo "Le smartphone BlackBerry a été supprimé\n";
	}

	$req = $pdo->prepare("SELECT * FROM smartphones WHERE marque = :marque");
	$req->execute(["marque" => "Samsung"]);
	foreach ($req->fetchAll() as $smartphone) {
		$text = "Voici le smartphone " . $smartphone->id_smartphone . "\n";
		$text .= "Marque : " . $smartphone->marque . "\n";
		$text .= "Nom : " . $smartphone->nom . "\n";
		$text .= "Année : " . $smartphone->annee . "\n";
		$text .= "\n\n";
		echo $text;
	}
} catch (PDOException $e) {
	die("Erreur SQL (6): " . $e->getMessage());
}





// Partie 2 POO

require_once "./Smartphone.php";

// 8
$smartphones = [
	new Smartphone(1, "Galaxy S10", "Samsung", 2019),
	new Smartphone(2, "Pro Max 15", "One Plus", 2023),
	new Smartphone(3, "Z Flip 4", "Samsung", 2022),
	new Smartphone(4, "Bold 9900", "BlackBerry", 2010),
];

foreach ($smartphones as $smartphone) {
	echo $smartphone;
}

// 9
$smartphone1 = $smartphones[0];
$smartphone1->eteindre();
echo $smartphone1->appel((int)"+32488253207");
$smartphone1->allumer();
echo $smartphone1->appel((int)"+32488253207");
echo $smartphone1;

// 10
$smartphone3 = $smartphones[2];
$smartphone4 = $smartphones[3];

if ($smartphone3->estMoinsVieux($smartphone4)) {
	echo "Le smartphone " . $smartphone4->getNom();
	echo " qui est sortie en " . $smartphone4->getAnnee();
	echo " est moins vieux que le smartphone";
	echo " " . $smartphone3->getNom() . " qui est sortie en " . $smartphone3->getAnnee();
} else {
	echo "Le smartphone " . $smartphone3->getNom();
	echo " qui est sortie en " . $smartphone3->getAnnee();
	echo " est moins vieux que le smartphone";
	echo " " . $smartphone4->getNom() . " qui est sortie en " . $smartphone4->getAnnee();
}











// Partie 3 POO

require_once "./Footballeur.php";
require_once "./Club.php";

// 12 et 13
$real_madrid = new Club(1, "Real Madrid", "Espagne", 3_890_000_000);
$barcelone = new Club(2, "FC Barcelone", "Espagne", 500_000_000);
$man_city = new Club(3, "Manchester City", "Angleterre", 2_000_000_000);
$al_nssr = new Club(4, "Al-Nassr", "Arabie-Saoudite", 9_999_999_999);

$neymar = new Footballeur(1, "Neymar", 33, "Brésilienne", $barcelone, 700_000_000);
$messi = new Footballeur(2, "Messi", 37, "Argentin", $barcelone, 1_000_000_000);
$cristiano = new Footballeur(3, "Cristiano", 39, "Portugais", $real_madrid, 1_000_000_000);
$halland = new Footballeur(4, "Halland", 23, "Norvégiens", $man_city, 2_000_000_000);

$clubs = [$real_madrid, $barcelone, $man_city, $al_nssr];
$joueurs = [$neymar, $messi, $cristiano, $halland];

// 13
foreach ($joueurs as $joueur) {
	echo $joueur;
}

// 14
$plusJeuneJoueur = $joueurs[0];
foreach ($joueurs as $joueur) {
	if ($joueur->getAge() < $plusJeuneJoueur->getAge()) {
		$plusJeuneJoueur = $joueur;
	}
}
echo $plusJeuneJoueur->sEntrainer();

// 15
$club = $barcelone;
$joueur = $halland;
if ($club->acheterJoueur($joueur)) {
	echo $club->getNomDuClub() . " a acheté le joueur " . $joueur->getName() . ".\n";
} else {
	echo $club->getNomDuClub() . " n'a pas pu s'acheter le joueur " . $joueur->getName() . " par manque de budget.\n";
}

// 16
$club = $real_madrid;
$joueur = $halland;
if ($club->acheterJoueur($joueur)) {
	echo $club->getNomDuClub() . " a acheté le joueur " . $joueur->getName() . ".\n";
} else {
	echo $club->getNomDuClub() . " n'a pas pu s'acheter le joueur " . $joueur->getName() . " par manque de budget.\n";
}

// 17
foreach ($clubs as $club) {
	if ($club->getPays() === "Espagne") {
		echo $club;
	}
}

// 18
$club = $al_nssr;
$joueur = $cristiano;

// NOUS VOULONS VENDRE Cristiano à Al-Nssr
// CA VEUT DIRE Al-Nssr DOIT L'ACHETER
if ($club->acheterJoueur($joueur)) {
	echo $club->getNomDuClub() . " a acheté le joueur " . $joueur->getName() . ".\n";
} else {
	echo $club->getNomDuClub() . " n'a pas pu s'acheter le joueur " . $joueur->getName() . " par manque de budget.\n";
}
