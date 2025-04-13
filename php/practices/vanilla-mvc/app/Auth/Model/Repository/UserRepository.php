<?php

namespace App\Auth\Model\Repository;

use App\Auth\Model\Entity\User;
use App\Model\Database;

class UserRepository extends Database
{
	protected string $table = "users";

	public function __construct()
	{
		parent::__construct($this->table);

		try {
			// FIXME : à changer
			$this->tryInsertMany(
				[
					[
						"firstname" => "Mike",
						"username" => "Test",
						"password" => password_hash("12345", PASSWORD_DEFAULT),
						"date_of_birth" => date("Y-m-d"),
						"city_id" => 1
					],
				],
			);
		} catch (\PDOException $e) {
			// NOTE : utilisateur est déjà existant, ne rien faire
		}
	}

	/**
	 * Cherche un nom d'utilisateur dans la table
	 */
	public function findByUsername(string $username): User|null
	{
		return $this->getOne(data: ["username" => $username]);
	}

	/**
	 * Récupère un utilisateur si existe.
	 * @param array $fields
	 * @param array $data
	 * @return User|null
	 */
	public function getOne(array $fields = ["*"], array $data = []): User|null
	{
		$sqlData = parent::getOne($fields, $data);

		if (!$sqlData) {
			return null;
		}

		return (new User((int)$sqlData->id))
			->setUsername($sqlData->username)
			->setPassword($sqlData->password);
	}

	public function getAll(array $fields = ["*"], array $bindings = [], array $options = []): array
	{
		return array_map(
			fn($user) => (new User((int)$user->id))
				->setUsername($user->username)
				->setPassword($user->password),
			parent::getAll($fields, $bindings, $options)
		);
	}
}
