<?php

function is_connected(): bool
{
	if (session_status() === PHP_SESSION_NONE) {
		session_start();
	}

	return isset($_SESSION["user"]);
}
