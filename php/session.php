<?php

session_start();

if (isset($_GET["op"])) {
	switch ($_GET["op"])
	{
		case "read":
		{
			$nav = "debug";
			$title = "Debug";
			require "header.php";
			var_dump($_SESSION);
			require "footer.php";
		} break;

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
			header("Location: session.php?op=read");
			exit;
		} break;
	}
}
