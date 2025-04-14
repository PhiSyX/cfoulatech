<link rel="stylesheet" href="public/css/pages/home.css">

<section class="home-page container">

	<a href="index.php">Retour</a>

	<h1>
		Notre formation <?= $dataView["formation"]->getIntitule() ?>
	</h1>

	<hr>

	<table>
		<thead>
		<tr>
			<th>ID</th>
			<th>Nom</th>
			<th>Prénom</th>
			<th>Adresse e-mail</th>
			<th>Date de naissance</th>
		</tr>
		</thead>
		<tbody>

		<?php foreach ($dataView["formation"]->getStagiaires() as $stagiaire): ?>
			<tr>
				<td><?= $stagiaire->getId() ?></td>
				<td><?= $stagiaire->getNom() ?></td>
				<td><?= $stagiaire->getPrenom() ?></td>
				<td><?= $stagiaire->getEmail() ?></td>
				<td><?= $stagiaire->getDateNaissance()->format("Y m d") ?></td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>

</section>
