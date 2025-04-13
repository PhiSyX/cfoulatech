<link rel="stylesheet" href="public/css/pages/login.css">

<section class="login-page">
	<h1 class="h3-like">Se connecter</h1>

	<h2 class="login-info">
		Entrez vos informations de connexion ci-dessous pour vous connecter à
		votre compte
	</h2>

	<form action="" method="post" class="login-form">
		<div class="input-group">
			<label for="username">Nom d'utilisateur</label>
			<input type="text" name="username" id="username"
				   tabindex="1" placeholder="JohnDoe"
				<?= $formHelper->inputValueAttribute('username') ?>
			>
			<?php $formHelper->error('username') ?>
		</div>

		<div class="input-group">
			<div class="input-group-label login-input-password">
				<label for="password">Mot de passe</label>
				<a href="#" title="Mot de passe oublié ?" tabindex="4">
					Mémoire courte ?
				</a>
			</div>
			<input type="password" name="password" id="password"
				   placeholder="Secret12345" tabindex="2"
				<?= $formHelper->inputValueAttribute('password') ?>
			>
			<?php $formHelper->error('password') ?>
		</div>

		<button type="submit" tabindex="3">Se connecter</button>

		<hr text="ou">

		<a href="https://github.com/PhiSyX" target="_blank" rel="noreferrer"
		   class="login-btn" tabindex="5"
		>
			Se connecter avec GitHub
		</a>

		<p>
			Vous n'avez pas de compte ?
			<a href="#" tabindex="6">S'inscrire</a>
		</p>
	</form>
</section>
