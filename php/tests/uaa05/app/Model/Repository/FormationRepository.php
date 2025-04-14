<?php

namespace App\Model\Repository;

use App\Model\Database;
use App\Model\Entity\Formation;

class FormationRepository extends Database
{
	protected string $table = "formations";

	public function __construct()
	{
		parent::__construct($this->table);
	}

	public function getOne(array $fields = ["*"], array $data = [], array $options = []): Formation|null
	{
		$item = parent::getOne($fields, $data, $options);
		if (!$item) {
			return null;
		}
		return (new Formation($item->id))
			->setIntitule($item->intitule)
			->setDateDebut($item->date_debut)
			->setNbMois($item->nb_mois);
	}

	public function getAll(array $fields = ["*"], array $bindings = [], array $options = []): array
	{
		return array_map(
			fn($formation) => (new Formation((int)$formation->id))
				->setIntitule($formation->intitule)
				->setDateDebut($formation->date_debut)
				->setNbMois($formation->nb_mois),
			parent::getAll($fields, $bindings, $options)
		);
	}
}
