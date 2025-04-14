<link rel="stylesheet" href="public/css/pages/home.css">

<section class="home-page container">
	<h1>
		Tous nos stagiaires
	</h1>

	<a href="?action=add" class="navbar-link navbar-link-cta">Ajouter un stagiaire</a>

	<hr>

	<table>
		<thead>
		<tr>
			<th>ID</th>
			<th>Nom</th>
			<th>Prénom</th>
			<th>Adresse e-mail</th>
			<th>Date de naissance</th>
			<th>Formation</th>
		</tr>
		</thead>
		<tbody>

		<?php foreach ($dataView["stagiaires"] as $stagiaire): ?>
			<tr>
				<td><?= $stagiaire->getId() ?></td>
				<td><?= $stagiaire->getNom() ?></td>
				<td><?= $stagiaire->getPrenom() ?></td>
				<td><?= $stagiaire->getEmail() ?></td>
				<td><?= $stagiaire->getDateNaissance()->format("Y m d") ?></td>
				<td><?= $stagiaire->getFormation()->getIntitule() ?></td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>

</section>
