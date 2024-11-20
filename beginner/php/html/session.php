<?php

session_start();

if (isset($_GET["op"])) {
	switch ($_GET["op"])
	{
		case "set":
		{
			$_SESSION["role"] = "admin";
			$_SESSION["user"] = [
				'firstname' => 'Julien',
				'lastname' => 'Dunia',
				'login' => 'deoking',
				'password' => 1111
			];
		} break;

		case "unset":
		{
			session_destroy();
		} break;
	}
}
