<link rel="stylesheet" href="public/css/pages/login.css">
<link rel="stylesheet" href="public/css/pages/home.css">

<section class="home-page container">
	<h1>Ajouter un stagiaire</h1>

	<form action="" method="post" class="login-form">
		<div class="input-group">
			<label for="nom">Nom</label>
			<input type="text" name="nom" id="nom"
				   placeholder="Doe"
				<?= $formHelper->inputValueAttribute('nom') ?>
			>
			<?php $formHelper->error('nom') ?>
		</div>

		<div class="input-group">
			<label for="prenom">Prénom</label>
			<input type="text" name="prenom" id="prenom"
				   placeholder="John"
				<?= $formHelper->inputValueAttribute('prenom') ?>
			>
			<?php $formHelper->error('prenom') ?>
		</div>

		<div class="input-group">
			<label for="email">Adresse e-mail</label>
			<input type="email" name="email" id="email"
				   placeholder="john@doe.be"
				<?= $formHelper->inputValueAttribute('email') ?>
			>
			<?php $formHelper->error('email') ?>
		</div>

		<div class="input-group">
			<label for="date_naissance">Date de naissance</label>
			<input type="date" name="date_naissance" id="date_naissance"
				<?= $formHelper->inputValueAttribute('date_naissance') ?>
			>
			<?php $formHelper->error('date_naissance') ?>
		</div>

		<div class="input-group">
			<label for="formation_id">Formation</label>
			<select name="formation_id" id="formation_id">
				<?php foreach ($dataView["formations"] as $formation): ?>
					<option value="<?= $formation->getId() ?>">
						<?= $formation->getIntitule() ?>
					</option>
				<?php endforeach; ?>
			</select>
			<?php $formHelper->error('formation_id') ?>
		</div>

		<button type="submit">Ajouter le stagiaire</button>
	</form>
</section>
