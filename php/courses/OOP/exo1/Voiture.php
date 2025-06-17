<?php

class Voiture
{
	// 1) Modifier votre Classe Voiture en donnant cette fois ci le type adéquat
	//    des propriétés. Affichez l’objet dans le navigateur.

	// 2) Donnez des valeurs à ces propriétés/attributs. Et affichez les dans le
	//    navigateur.
	private string $couleur = "Blanche";
	private float $poids = 1500;
	private float $prix = 7800;

	// 3) Ajoutez les deux méthodes qu’on voit dans notre image sur la classe
	//    voiture. Elles ne retourneront rien, elles afficheront chacune juste
	//    un message disant ce que fait la voiture.

	public function accelerer(): void
	{
		echo "La voiture accélère<br>";
	}

	public function demarrer(): void
	{
		echo "La voiture démarre<br>";
	}

	public function setCouleur(string $couleur): void
	{
		$this->couleur = $couleur;
	}

	// 6) Créez dans un premier temps 2 méthodes de modification pour les 2
	//    autres attributs de classe.

	public function setPoids(float $poids): void
	{
		$this->poids = $poids;
	}

	public function setPrix(float $prix): void
	{
		$this->prix = $prix;
	}

	// 8) Créez maintenant une méthode (getCouleur) qui permet de récupérer la
	//    couleur et de pouvoir afficher la couleur à partir du main.php
	public function getCouleur(): string
	{
		return $this->couleur;
	}

	public function getPrix(): float
	{
		return $this->prix;
	}

	public function getPoids(): float
	{
		return $this->poids;
	}

	// 9)
	public function addPrix(float $prix): void
	{
		$this->prix += $prix;
	}
}
