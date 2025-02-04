<?php

require_once "./app/Auth.php";

$auth = new Auth;

if (!$auth->is_connected()) {
	// Redirect back
	exit;
}

$auth->logout();
