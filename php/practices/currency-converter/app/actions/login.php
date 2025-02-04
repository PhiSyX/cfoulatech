<?php

require_once "./app/Auth.php";

class LoginAction
{
	public function __construct(
		private Auth $auth,
		private string $username,
		private string $password,
	) {}

	public function validate(): array|bool
	{
		$errors = [];

		if (trim($this->username) === "") {
			$errors["username"] = "Username MUST NOT be empty";
		}

		if (strlen($this->password) === 0) {
			$errors["password"] = "The password cannot be empty";
			$errors["password_confirm"] = "The password cannot be empty";
		}

		if (count($errors) > 0) {
			return $errors;
		}

		return false;
	}

	public function attempt()
	{
		$user = $this->auth->attempt($this->username, $this->password);

		if ($user) {
			return true;
		}

		$errors["global"] = "Unable to log in with these credentials.";

		return $errors;
	}
}

$auth = new Auth;

if ($auth->isConnected()) {
	$auth->redirectProfile();
}

$action = new LoginAction(
	auth: $auth,
	username: $_POST["username"],
	password: $_POST["password"],
);

$errors = $action->validate();

if ($errors === false) {
	$errors = $action->attempt();
}

require "./views/signin.php";
