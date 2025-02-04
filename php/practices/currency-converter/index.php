<?php


switch ($_SERVER["REQUEST_METHOD"]):
	case "GET":
	{
		$page = isset($_GET["page"]) ? $_GET["page"] : "signin";

		if (file_exists("views/$page.php")):
			require "views/$page.php";
		else:
			require "views/errors/404_notfound.php";
		endif;
	} break;

	case "POST":
	{
		$action = isset($_GET["action"]) ? $_GET["action"] : null;

		if ($action && file_exists("app/actions/$action.php")):
			require "app/actions/$action.php";
		else:
			require "views/errors/404_notfound.php";
		endif;
	} break;
endswitch;
