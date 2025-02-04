<?php

require_once "./app/User.php";

class Auth
{
	private PDO $database;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct()
	{
		$this->database = new PDO('mysql:dbname=tp_currency_converter;host=localhost', "root", "");
		$this->database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$this->database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function get_user_session(): User|null
	{
		if (session_status() === PHP_SESSION_NONE) {
			session_start();
		}
		return isset($_SESSION["user"]) ? $_SESSION["user"] : null;
	}

	private function set_user_session(User $user): void
	{
		if (session_status() === PHP_SESSION_NONE) {
			session_start();
		}
		$_SESSION["user"] = $user;
	}

	private function unset_user_session(): void
	{
		if (session_status() === PHP_SESSION_NONE) {
			session_start();
		}
		unset($_SESSION["currency_result"]);
		unset($_SESSION["user"]);
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function attempt(string $username, string $password): User|null
	{
		$user = $this->find_by_username($username);

		// Utilisateur non trouvé
		if (!$user) {
			return null;
		}

		// Les mots de passes ne correspondent pas
		if (!password_verify($password, $user->get_password())) {
			return null;
		}

		// Tout est ok.

		$this->set_user_session($user);

		return $user;
	}

	public function find_by_username(string $username): User|null
	{
		$req = $this->database->prepare("SELECT * FROM users WHERE username = :username LIMIT 1", []);
		// $req->setFetchMode(PDO::FETCH_CLASS, User::class);
		$req->execute(["username" => $username]);
		$data = $req->fetch();
		if (!$data) {
			return null;
		}
		$user = new User($data->username, $data->email, $data->password, $data->id);
		return $user;
	}

	public function insert(
		string $username,
		string $email,
		string $password,
	): bool {
		$req = $this->database->prepare("INSERT INTO users (username,email,password) VALUES (:username,:email,:password)");

		try {
			return $req->execute(["username" => $username, "email" => $email, "password" => $password,]);
		} catch (PDOException $error) {
			return false;
		}
	}

	public function is_connected(): bool
	{
		return $this->get_user_session() !== null && !empty($this->get_user_session()->get_id());
	}

	public function logout(): void
	{
		$this->unset_user_session();
		$this->redirect_signin();
	}

	public function redirect_profile(): void
	{
		header("Location: ?page=profile");
		exit;
	}

	public function redirect_signin(): void
	{
		header("Location: ?page=signin");
		exit;
	}
}
