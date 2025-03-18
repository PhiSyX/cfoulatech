<?php

$json_file = file_get_contents("exo02.json", true);
if (!$json_file) {
	die("Erreur de lecture du fichier JSON.");
}

$json_data = json_decode($json_file);
if (json_last_error() !== JSON_ERROR_NONE) {
	die("Erreur de décodage JSON : " . json_last_error_msg());
}

if (empty($_SERVER["HTTP_HOST"])):
	echo json_encode($json_data, JSON_PRETTY_PRINT);
else:
?>
	<pre><?= json_encode($json_data, JSON_PRETTY_PRINT) ?></pre>
<?php
endif;
