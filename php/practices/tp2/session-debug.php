<?php

/* TP1:

b. Une page Session Actuelle avec comme titre DEBUG qui servira à montrer toutes
   les sessions en mode debug

*/

session_start();

$title = "Debug Session";
$nav = "session-debug";
?>
<?php include "./includes/layouts/header.php" ?>

<main>
	<section class="debug">
		<details open>
			<summary>DEBUG</summary>

			<?php if (isset($_SESSION) && ! empty($_SESSION)): ?>
				<h1>Les données de <small>$_SESSION</small></h1>
				<?php var_dump($_SESSION); ?>
			<?php endif; ?>
		</details>
	</section>
</main>

<?php include "./includes/layouts/footer.php" ?>
