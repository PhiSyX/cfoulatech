<?php

/* TP1:

h. Une page Mon profile qui aura comme titre Mon Profile, qui si vous êtes
   connecté il vous dira bienvenu votre prénom dans votre page de profile. Si
   vous n'êtes pas connecté il vous renverra vers la page de login.

*/

require_once "./functions/auth.php";
require_once "./functions/redirect.php";

if (!is_connected()) {
	redirect_to("login.php");
}

require_once "./functions/math.php";

$title = "Mon profil";
$nav = "profile";
$styles = ["./assets/css/pages/profile.css"];

function get_last_operation($op)
{
	if (empty($_SESSION["operations"][$op])) {
		return null;
	}

	$arr = $_SESSION["operations"][$op];
	$last = count($arr) - 1;
	$item = $arr[$last];
	$item["fullop"] =
		$item["left_operand"] .
		" " .
		$item["operator"] .
		" " .
		$item["right_operand"];
	return $item;
}
?>
<?php include "./includes/layouts/header.php"; ?>

<section id="profile-page" class="center:x">

	<header class="welcome avatar avatar--anim">
		<h2>
			Bienvenue
			<small><?= $_SESSION["user"]["login"] ?></small>
		</h2>

		<!-- TP2:

		j. (Facile) Rajoutez une petite image de profile, visible dans Mon profile.

		-->
		<img
			src="<?= $_SESSION["user"]["avatar"] ?>"
			alt="Photo de profil" height="300" width="300"
		>
	</header>

	<?php if (isset($_SESSION["operations"]["total"])): ?>
		<!-- TP2:

		h. (Difficile) Je veux que dans la page de Mon profile, on voit le nombre
						d'opérations mathématique que vous avez réussi à faire.
						C'est-à-dire que si vous faites 4 additions, 2
						multiplications, 1 division et 3 soustractions. Il devra
						afficher un message en disant vous avez fait 10 opérations
						mathématique. Attention même si on se déconnecte, quand vous
						vous reconnecterez et que vous refaites 3 divisions et 2
						multiplications, on verra que vous avez fait 15 opérations
						mathématique. Ce sera donc gardez en mémoire
		-->
		<p>
			Vous avez fait
			<strong><?= $_SESSION["operations"]["total"] ?></strong>
			opérations
		</p>
	<?php endif; ?>

	<?php if (has_session_math()): ?>
		<details open>
			<summary>Les dernières opérations arithmétiques</summary>
			<ul>
				<?php foreach ($_SESSION["operations"] as $operation_key => $operation_value):

    	if (!is_array($operation_value)):
    		continue;
    	endif;
    	$op = get_last_operation($operation_key);
    	?>
					<li>
						Votre dernière <?= $operation_key ?> faite, est :
						<strong><?= $op["fullop"] ?></strong> donne
						<strong><?= $op["result"] ?></strong>.
					</li>
				<?php
    endforeach; ?>

			</ul>
		</details>
	<?php endif; ?>

	<!--  TP2:

	n. (Très difficile) Je veux pour finir que vous sauvegardez en mémoire
						TOUTES les opérations mathématique que vous avez fait.
						Et qu'on les voit tous dans Mon Profile sous forme d'un
						tableau de 4 colonnes avec comme titres : opérations,
						nombre 1, nombre 2 et résultat. Dans opérations vous
						mettrez le nom de l'opération. Donc pensez à retenir
						pour chaque opération le nom de l'opération que vous
						avez fait. Ensuite pour le nombre de ligne de votre
						table ça dépendra bien entendu du nombre d'opération
						que vous aurez fait.

	-->
	<?php if (has_session_math()): ?>
		<details open>
			<summary>Toutes les opérations arithmétiques</summary>

			<table>
				<thead>
					<tr>
						<th>Opération</th>
						<th>Nombre 1</th>
						<th>Nombre 2</th>
						<th>Résultat</th>
					</tr>
				</thead>

				<tbody>
					<?php foreach ($_SESSION["operations"] as $operation_key => $operations):

     	if (!is_array($operations)):
     		continue;
     	endif;
     	foreach ($operations as $operation): ?>
							<tr>
								<th><?= ucfirst($operation_key) ?></th>
								<td><?= $operation["left_operand"] ?></td>
								<td><?= $operation["right_operand"] ?></td>
								<td><?= $operation["result"] ?></td>
							</tr>
						<?php endforeach;
     	?>
					<?php
     endforeach; ?>
					<tr>
						<th>Total</th>
						<th colspan="3"><?= $_SESSION["operations"]["total"] ?></th>
					</tr>
				</tbody>
			</table>
		</details>
	<?php endif; ?>


</section>

<?php include "./includes/layouts/footer.php"; ?>
