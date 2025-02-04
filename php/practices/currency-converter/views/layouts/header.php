<?php
require_once "./app/Auth.php";
require_once "./views/functions/error.php";

if (!isset($auth)) {
	$auth = new Auth;
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php
			if (isset($page)):
				echo $page->get_title();
			else:
				echo "Mon super site";
			endif;
			?></title>
	<link rel="stylesheet" href="assets/css/style.css">
</head>

<body>

	<?php if ($auth->is_connected()): ?>
		<aside>
			<nav>
				<a
					href="?page=profile"
					<?php if (isset($page) && $page->get_page() === "profile"): ?>class="active" <?php endif ?>>
					Profile
				</a>

				<a
					href="?page=conversion"
					<?php if (isset($page) && $page->get_page() === "conversion"): ?>class="active" <?php endif ?>>
					Mikonvertika
				</a>

				<a href="?page=signout">Log Out, <?= $auth->get_user_session()->get_username(); ?></a>

				<a href="?page=session">Session</a>
				<a href="?page=session&destroy">Clear Session</a>
			</nav>
		</aside>
	<?php endif ?>

	<main class="container" role="main">

		<?php if (isset($errors) && is_array($errors) && isset($errors["global"])): ?>
			<div class="alert alert--error">
				<?= $errors["global"]; ?>
			</div>
		<?php endif; ?>
