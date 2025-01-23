<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php echo isset($title) ? $title : "TP1" ?></title>

	<link rel="stylesheet" href="./assets/css/style.css">

	<?php if (isset($styles)) : ?>
		<?php foreach ($styles as $chemin_du_css): ?>
			<link rel="stylesheet" href="<?php echo $chemin_du_css; ?>">
		<?php endforeach ?>
	<?php endif ?>
</head>

<body class="l-body">

	<input type="checkbox" id="toggle-navigation-global">

	<?php include "./includes/components/topbar.php" ?>

	<div class="l-main">
		<?php include "./includes/components/navigation_global.php" ?>

		<main role="main">
