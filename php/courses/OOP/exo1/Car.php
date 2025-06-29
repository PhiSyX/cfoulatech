<?php

class Car
{
	// 1) Modifier votre Classe Car en donnant cette fois-ci le type adéquat
	//    des propriétés. Affichez l’objet dans le navigateur.

	// 2) Donnez des valeurs à ces propriétés/attributs. Et affichez-les dans le
	//    navigateur.
	private string $color = "Blanche";
	private float $weight = 1500;
	private float $price = 7800;

	// 3) Ajoutez les deux méthodes qu’on voit dans notre image sur la classe
	//    voiture. Elles ne retourneront rien, elles afficheront chacune juste
	//    un message disant ce que fait la voiture.

	public function accelerate(): void
	{
		echo "La voiture accélère<br>";
	}

	public function start(): void
	{
		echo "La voiture démarre<br>";
	}

	public function getColor(): string
	{
		return $this->color;
	}

	// 6) Créez dans un premier temps 2 méthodes de modification pour les 2
	//    autres attributs de classe.

	public function setColor(string $color): void
	{
		$this->color = $color;
	}

	public function getPrice(): float
	{
		return $this->price;
	}

	// 8) Créez maintenant une méthode (getCouleur) qui permet de récupérer la
	//    couleur et de pouvoir afficher la couleur à partir du main.php

	public function setPrice(float $price): void
	{
		$this->price = $price;
	}

	public function getWeight(): float
	{
		return $this->weight;
	}

	public function setWeight(float $weight): void
	{
		$this->weight = $weight;
	}

	// 9)

	public function addPrix(float $prix): void
	{
		$this->price += $prix;
	}
}
