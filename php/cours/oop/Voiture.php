<?php

class Voiture
{
    /** Les états */

    /**
     * Couleur de la voiture
     */
    private string $couleur;
    /**
     * Poids de la voiture
     */
    private float $poids;
    /**
     * Prix de la voiture
     */
    private int $prix;

    /**
     * Permet de construire la classe Voiture en un type `objet Voiture`
     */
    public function __construct(string $couleur, float $poids, int $prix)
    {
        $this->couleur = $couleur;
        $this->poids = $poids;
        $this->prix = $prix;
    }

    /** Les comportements */

    /**
     * Démarre la voiture
     */
    public function demarrer(): void {}

    /**
     * Accélère la voiture
     */
    public function accelerer(): void {}
}
