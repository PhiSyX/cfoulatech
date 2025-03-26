<?php
$title = "Tableau de bord";
$nav = "dashboard";
require_once "./header.php";

if (!is_connected()) {
	header("Location: login.php");
	exit();
}
?>

<section id="dashboard-page" class="center:i">
	<h1><?= $title ?> de <small><?= $_SESSION["user"]["firstname"] ?></small></h1>
</section>

<?php require_once "./footer.php"; ?>
