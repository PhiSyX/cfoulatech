<?php

function is_connected(): bool
{
	if (session_status() === PHP_SESSION_NONE) {
		session_start();
	}
	return ! empty($_SESSION["user"]);
}

function unset_user_session(): void
{
	if (session_status() === PHP_SESSION_NONE) {
		session_start();
	}

	unset($_SESSION["user"]);
}
