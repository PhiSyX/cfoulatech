<?php

require_once "./app/Auth.php";

$auth = new Auth;

if (!$auth->isConnected()) {
	// Redirect back
	exit;
}

$auth->logout();
