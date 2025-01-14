<?php

class Voiture
{
    /** Les états */

    /**
     * Couleur de la voiture
     */
    private string $couleur = "Blanche";
    /**
     * Poids de la voiture
     */
    private float $poids = 1500.0;
    /**
     * Prix de la voiture
     */
    private int $prix = 7800;

    /**
     * Permet de construire la classe Voiture en un type `objet Voiture`
     */
    //public function __construct(string $couleur, float $poids, int $prix)
    //{
    //    $this->couleur = $couleur;
    //    $this->poids = $poids;
    //    $this->prix = $prix;
    //}

    /** Les getters / setters */

    public function getCouleur(): string
    {
        return $this->couleur;
    }

    public function setCouleur(string $couleur): void
    {
        $this->couleur = $couleur;
    }

    public function getPrix(): int
    {
        return $this->prix;
    }

    public function setPrix(int $prix): void
    {
        $this->prix = $prix;
    }

    public function getPoids(): float
    {
        return $this->poids;
    }

    public function setPoids(float $poids): void
    {
        $this->poids = $poids;
    }

	public function addPrix(int $prix): void
	{
		$this->prix += $prix;
	}

    /** Les comportements */

    /**
     * Cette fonction démarre la voiture
     */
    public function demarrer(): void
    {
        echo "La voiture {$this->couleur} a démarré";
    }

    /**
     * Cette fonction accélère la voiture
     */
    public function accelerer(): void
    {
        echo "La voiture {$this->couleur} accélère";
    }
}
