<?php

namespace App\Model;

use PDO;
use PDOException;

class Database
{
	/**
	 * Variable PDO de connexion à une base de données.
	 */
	protected PDO $pdo; //- /!\ Coupage fort

	/**
	 * Nom d'hôte de connexion à la base de données.
	 */
	private string $host;
	/**
	 * Port de connexion à la base de données.
	 */
	private string $port;
	/**
	 * Utilisateur de connexion à la base de données.
	 */
	private string $user;
	/**
	 * Mot de passe de connexion à la base de données.
	 */
	private string $pass;
	/**
	 * Nom de la base de données à opérer.
	 */
	private string $dbname;

	/**
	 * Une table
	 */
	protected string $table;
	/**
	 * Les champs de la table ^
	 * @var array
	 */
	protected array $fields = [];

	/**
	 * Constructor
	 */
	public function __construct(string $table)
	{
		$config = require_once dirname(__DIR__, 2) . "/config/database.php";
		$this->host = $config["host"];
		$this->port = $config["port"];
		$this->user = $config["user"];
		$this->pass = $config["pass"];
		$this->dbname = $config["dbname"];

		$host = $this->host;
		if ($this->port) {
			$host .= ":" . $this->port;
		}

		$this->table = $table;

		try {
			$this->pdo = new PDO(
				"mysql:host=" . $host . ";dbname=" . $this->dbname,
				$this->user,
				$this->pass
			);
			$this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			$this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

			$stmt = $this->pdo->query("DESCRIBE " . $this->table);
			$data = $stmt->fetchAll();

			$this->fields = array_reduce($data, function ($cur, $item) {
				$cur[$item->Field] = $item;
				return $cur;
			}, []);
		} catch (PDOException $e) {
			$errors = ["cause" => "db", "dbtable" => $this->table, "exception" => $e->getMessage()];

			if (str_contains($e->getMessage(), "No such file or directory")) {
				$errors["type"] = "unavailable";
			} else if (str_contains($e->getMessage(), "Access denied for user")) {
				$errors["type"] = "access_denied";
			} else if (str_contains($e->getMessage(), "Unknown database")) {
				$errors["type"] = "unknown_database";
			} else if (str_contains($e->getMessage(), "Base table or view not found")) {
				$errors["type"] = "unknown_table";
			}

			include "templates/errors/error503.html.php";
			exit;
		}
	}

	/**
	 * Récupère un seul résultat d'une table, si existe.
	 *
	 * @param array $fields
	 * @param array $data
	 * @return array|null
	 */
	public function getOne(array $fields = ["*"], array $data = []): object|null
	{
		$req = $this->buildSelectQuery($fields, [
			"where" => array_keys($data),
			"limit" => 1,
		]);

		try {
			$stmt = $this->pdo->prepare($req);
			if ($stmt->execute($data) === false) {
				return null;
			}
			return $stmt->fetch() ?: null;
		} catch (PDOException $e) {
			return null;
		}
	}

	/**
	 * Récupère plusieurs résultats d'une table, si existe.
	 *
	 * @param array $fields
	 * @param array $bindings
	 * @param array $options
	 * @return array
	 */
	public function getAll(
		array $fields = ["*"],
		array $bindings = [],
		array $options = [],
	): array
	{
		$options["where"] = array_keys($bindings);
		$req = $this->buildSelectQuery($fields, $options);
		try {
			$stmt = $this->pdo->prepare($req);
			if ($stmt->execute($bindings) === false) {
				return [];
			}
			return $stmt->fetchAll();
		} catch (PDOException $e) {
			return [];
		}
	}

	/**
	 * Tente d'insérer des données dans une table.
	 * @param array $data
	 * @return bool
	 */
	public function tryInsertMany(array $data = []): bool
	{
		$table = $this->table;
		$fields = array_keys($data[0]);
		$placeholders = join(",", array_map(fn($field) => ":$field", $fields));
		$fields = join(",", $fields);
		$stmt = $this->pdo->prepare("INSERT INTO $table ($fields) VALUES ($placeholders)");
		foreach ($data as $item) {
			if (!$stmt->execute($item)) {
				return false;
			}
		}
		return true;
	}

	/**
	 * @param array $fields
	 * @param array $options
	 * @return string
	 */
	private function buildSelectQuery(array $fields, array $options): string
	{
		$req = "SELECT";
		foreach ($fields as $field) {
			$req .= " $field";
		}
		$req .= " FROM ";
		$req .= $this->table;

		if (!empty($options["where"])) {
			$req .= " WHERE";
			foreach ($options["where"] as $field) {
				$req .= " $field = :$field";
			}
		}

		if (isset($options["limit"])) {
			$req .= " LIMIT " . $options["limit"];
		}

		return $req;
	}
}
