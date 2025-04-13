<link rel="stylesheet" href="public/css/pages/home.css">

<section class="hero"
		 style="--hero-img: url(https://cfitech.be/wp-content/uploads/2024/11/Web-Developer-Full-Stack-min-scaled-1-e1734549157406-1024x683.webp)">
	<div class="container">
		<h1 class="hero-title">Développeur Web</h1>

		<p class="hero-description">
			Apprenez à coder. Créez l’impossible. Changez votre vie.
			<br>
			Le code est la langue du futur. Apprenez-la aujourd’hui, construisez
			demain.
			<br>
			Transformez vos idées en code et votre avenir en succès, démarrez
			votre parcours de développeur dès aujourd'hui.
		</p>

		<a href="#" class="navbar-link-cta">
			Profitez de l'offre spécial 60%
		</a>
	</div>
</section>

<section class="home-page container">
	<h1>Données</h1>

	<table>
		<thead>
		<tr>
			<th>ID</th>
			<th>Username</th>
		</tr>
		</thead>
		<tbody>

		<?php foreach ($dataView["users"] as $user): ?>
			<tr>
				<td><?= $user->getId() ?></td>
				<td><?= $user->getUsername() ?></td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table

</section>
