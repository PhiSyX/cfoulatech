<?php

require_once "./database/connection.php";
require_once "./entities/User.php";
require_once "./entities/Message.php";

session_start();

date_default_timezone_set("Europe/Brussels");

header("X-Accel-Buffering: no");
header("Content-Type: text/event-stream");
header("Cache-Control: no-cache");

$message = new Message($pdo);

$lastMessageID = isset($_GET["lastMessageID"]) ? $_GET["lastMessageID"] : 0;
$res = $message->ShowLastMessage($lastMessageID);

while (!connection_aborted()) {
	if (! $res) {
		break;
	}

	$data = $res->fetch();

	if (!$data) {
		break;
	}

	echo "event: message\n";
	echo 'data: ' . json_encode($data);
	echo "\n\n";

	/**
	 * https://developer.mozilla.org/fr/docs/Web/API/Server-sent_events/Using_server-sent_events
	 */

	if (ob_get_contents()) {
		ob_end_flush();
	}

	flush();

	sleep(1);
}
