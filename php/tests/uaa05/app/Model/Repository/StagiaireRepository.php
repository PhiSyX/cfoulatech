<?php

namespace App\Model\Repository;

use App\Model\Database;
use App\Model\Entity\Formation;
use App\Model\Entity\Stagiaire;

class StagiaireRepository extends Database
{
	protected string $table = "stagiaires";

	public function __construct()
	{
		parent::__construct($this->table);
	}

	public function getAll(array $fields = ["*"], array $bindings = [], array $options = []): array
	{
		return array_map(function ($stagiaire) {
			$st = (new Stagiaire((int)$stagiaire->id))
				->setNom($stagiaire->nom)
				->setPrenom($stagiaire->prenom)
				->setEmail($stagiaire->email)
				->setDateNaissance($stagiaire->date_naissance);

			if (isset($stagiaire->intitule)) {
				$st->setFormation((new Formation((int)$stagiaire->formation_id))
					->setIntitule($stagiaire->intitule));
			}

			return $st;
		},
			parent::getAll($fields, $bindings, $options)
		);
	}
}
