<?php

return [
	"sessionKey" => basename(dirname(__DIR__)) . ".user",
	"loginPath" => "login.php",
	"logoutPath" => "logout.php",
	"redirectAfterLogout" => "login.php",
	"redirectAfterLogin" => "index.php",
];
