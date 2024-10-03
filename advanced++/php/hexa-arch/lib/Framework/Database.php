<?php

namespace Framework;

use PDO;

/**
 * Utilise le pattern Singleton
 */
class Database
{
    /**
     * Instance de la base donnée
     */
    private static ?Database $_instance = null;

    public static function singleton()
    {
        if (is_null(self::$_instance)) {
            $config = include_once __DIR__ . "/../../config/database.php";
            self::$_instance = new Database($config);
        }

        return self::$_instance;
    }

    private PDO $pdo;

    public function __construct(array $config)
    {
        $driver = $config["driver"];
        $host = $config["host"];
        $port = $config["port"];
        $dbname = $config["name"];

        $user = $config["user"];
        $pass = $config["pass"];

        $this->pdo = new PDO(
            "$driver://host=$host;port=$port;dbname=$dbname",
            $user,
            $pass,
            [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
            ]
        );
    }

    /**
     * Retourne toutes les données d'une requête SQL, si trouvé.
     */
    public function fetch_all(string $query)
    {
        $query = $this->pdo->query($query);
        return $query->fetchAll();
    }

    /**
     * Insère des données en base de données.
     */
    public function insert(string $query, array $data)
    {
        $query = $this->pdo->prepare($query);
        $query->execute($data);
    }
}
