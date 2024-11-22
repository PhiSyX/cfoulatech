<?php
$title = "Tableau de bord";
$nav = "dashboard";
require_once "./header.php";

if ( ! is_connected()) {
	header("Location: login.php");
	die();
}
?>
<main>
	<section id="dashboard-page">
		<h1><?= $title; ?></h1>
	</section>
</main>

<?php require_once "./footer.php"; ?>
