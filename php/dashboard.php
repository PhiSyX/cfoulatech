<?php
$title = "Tableau de bord";
$nav = "dashboard";
require_once "./header.php";

if (! is_connected()) {
	header("Location: login.php");
	exit;
}
?>
<main>
	<section id="dashboard-page">
		<h1><?= $title; ?> de <small><?= $_SESSION["user"]["firstname"]; ?></small></h1>
	</section>
</main>

<?php require_once "./footer.php"; ?>
