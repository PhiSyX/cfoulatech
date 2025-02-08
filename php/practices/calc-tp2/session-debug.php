<?php

/* TP1:

b. Une page Session Actuelle avec comme titre DEBUG qui servira à montrer toutes
   les sessions en mode debug

*/

session_start();

$title = "Debug Session";
$nav = "session-debug";
?>
<?php include "./includes/layouts/header.php"; ?>

<main>
	<section class="debug">
		<details open>
			<summary>DEBUG</summary>

			<?php if (isset($_SESSION["user"]) && !empty($_SESSION["user"])): ?>
				<h1>Le dump de <small>$_SESSION["user"]</small></h1>
				<?php var_dump($_SESSION["user"]); ?>
			<?php endif; ?>

			<?php if (isset($_SESSION["operations"]) && !empty($_SESSION["operations"])): ?>
				<h1>Le dump de <small>$_SESSION["operations"]</small></h1>
				<?php var_dump($_SESSION["operations"]); ?>
			<?php endif; ?>
		</details>
	</section>
</main>

<?php include "./includes/layouts/footer.php"; ?>
