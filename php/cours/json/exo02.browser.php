<?php

$json_file = file_get_contents("exo02.json");
if (!$json_file) {
	die("Erreur de lecture du fichier JSON.");
}

$json_data = json_decode($json_file);
if (json_last_error() !== JSON_ERROR_NONE) {
	die("Erreur de décodage JSON : " . json_last_error_msg());
}
?>
<pre><?= json_encode($json_data, JSON_PRETTY_PRINT) ?></pre>
