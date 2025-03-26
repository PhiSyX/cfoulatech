<?php

class User
{
	private  int $id_user;
	private  string $name;
	private string $lastName;
	private string $email;
	private string $password;
	private PDO $pdo;

	/*
	public function __construct(int $nouveuaIdUser, string $nouvelleName,string $nouvelleLastName ,string $nouvelleEmail, string $nouvellePassword, PDO $nouvellePdo) {
        $this->id_user = $nouveuaIdUser;
        $this->name =$nouvelleName;
        $this->lastName = $nouvelleLastName;
        $this->email = $nouvelleEmail;
       $this-> pdo= $nouvellePdo;
    }
	*/

	public function __construct(PDO $nouvellePdo)
	{
		$this->pdo = $nouvellePdo;
	}

	// Getters e Setters
	public function getIdUser(): int
	{
		return $this->id_user;
	}

	public function getName(): string
	{
		return $this->name;
	}
	public function getLastName(): string
	{
		return $this->lastName;
	}
	public function getEmail(): string
	{
		return $this->email;
	}
	public function getPassword(): string
	{
		return $this->password;
	}


	public function setIdUser(int $nouveuaIdUser): void
	{
		$this->id_user = $nouveuaIdUser;
	}
	public function setName(string $nouvelleName): void
	{
		$this->name =  $nouvelleName;
	}
	public function setLastName(string $nouvelleLastName): void
	{
		$this->lastName = $nouvelleLastName;
	}
	public function setEmail(string $nouvelleEmail): void
	{
		$this->email = $nouvelleEmail;
	}
	public function setPassword(string $nouvellePassword): void
	{
		$this->password = $nouvellePassword;
	}


	public function Connexion(string $email, string $password): bool
	{
		$req =  $this->pdo->prepare('SELECT * FROM users WHERE email = :email');
		$req->execute(array(
			'email' => $email
		));
		$user = $req->fetch();
		if ($user && password_verify($password, $user->password)) {
			session_start();
			$_SESSION["user"] = $user;
			return true;
		}
		return false;
	}

	public function Incription(string $prenom, string $nom, string $email, string $password): bool
	{
		$req =  $this->pdo->prepare('INSERT INTO users VALUES(:id_user, :firstname, :lastname, :email, :password)');
		return $req->execute(array(
			'id_user' => NULL,
			'firstname' => $prenom,
			'lastname' => $nom,
			'email' => $email,
			'password' => $password,


		));
	}
	public function __toString()
	{
		return "User [ID: {$this->id_user}, Name: {$this->name}, Last Name: {$this->lastName},Email: {$this->email}, Password: {$this->password}]";
	}
}
