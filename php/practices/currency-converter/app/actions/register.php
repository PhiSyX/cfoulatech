<?php

require_once "./app/Auth.php";

class RegisterAction
{
	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct(
		private Auth $auth,
		private string $username,
		private string $email,
		private string $password,
		private string $password_confirm,
	) {}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function validate(): array|bool
	{
		$errors = [];

		if (trim($this->username) === "") {
			$errors["username"] = "Username MUST NOT be empty";
		}

		if (trim($this->email) === "") {
			$errors["email"] = "The email address MUST NOT be empty";
		} else if (strpos($this->email, '@') == false) {
			$errors["email"] = "The email address MUST CONTAIN the @ character";
		}

		if (strlen($this->password) === 0 || strlen($this->password_confirm) === 0) {
			$errors["password"] = "The password cannot be empty";
			$errors["password_confirm"] = "The password cannot be empty";
		} else if ($this->password !== $this->password_confirm) {
			$errors["password"] = "Both passwords MUST BE the same.";
			$errors["password_confirm"] = "Both passwords MUST BE the same.";
		}

		if (count($errors) > 0) {
			return $errors;
		}

		return false;
	}

	public function save(): array|bool
	{
		if ($this->auth->insert(
			$this->username,
			$this->email,
			password_hash($this->password, PASSWORD_DEFAULT)
		)) {
			$this->auth->redirect_signin();
			return true;
		} else {
			$errors["global"] = "Une erreur s'est produite lors de l'inscription, " .
				"vous ne pouvez pas vous inscrire avec ces identifiants, " .
				"ils ont été bannis de nos services.";
			return $errors;
		}
	}
}

$auth = new Auth;

if ($auth->is_connected()) {
	$auth->redirect_profile();
}

$action = new RegisterAction(
	auth: $auth,
	username: $_POST["username"],
	email: $_POST["email"],
	password: $_POST["password"],
	password_confirm: $_POST["password_confirm"],
);

$errors = $action->validate();

if ($errors === false) {
	$errors = $action->save();
}

require "./views/signup.php";
