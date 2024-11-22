<?php

session_start();

if (isset($_GET["op"])) {
	switch ($_GET["op"])
	{
		case "set":
		{
			$_SESSION["role"] = "admin";
			$_SESSION["user"] = [
				'firstname' => 'Mike',
				'lastname' => 'S.',
				'login' => 'PhiSyX',
				'password' => 12345,
			];
		} break;

		case "unset":
		{
			session_destroy();
			session_unset();
		} break;
	}
}
