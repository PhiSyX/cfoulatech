<?php


switch ($_SERVER["REQUEST_METHOD"]):
	case "GET":
	{
		$pageParam = isset($_GET["page"]) ? $_GET["page"] : "signin";

		if (file_exists("views/$pageParam.php")):
			require "views/$pageParam.php";
		else:
			require "views/errors/404_notfound.php";
		endif;
	} break;

	case "POST":
	{
		$actionParam = isset($_GET["action"]) ? $_GET["action"] : null;

		if ($actionParam && file_exists("app/actions/$actionParam.php")):
			require "app/actions/$actionParam.php";
		else:
			require "views/errors/404_notfound.php";
		endif;
	} break;
endswitch;
