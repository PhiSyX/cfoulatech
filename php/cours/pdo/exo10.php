<?php

require_once "./pdo.php";
require_once "./utils.php";

$describes = fetchAll("DESCRIBE users");
$users = fetchAll("SELECT * FROM users");
?>

<?php if (count($users) > 0): ?>
	<section>
		<h1>Tous les utilisateurs</h1>

		<table>
			<thead>
				<tr>
					<?php foreach ($describes as $describe): ?>
						<th><?= capitalize($describe->Field) ?></th>
					<?php endforeach ?>
				</tr>
			</thead>

			<tbody>
				<?php foreach ($users as $user): ?>
					<tr>
						<?php foreach ($user as $val): ?>
							<td><?= $val ?></td>
						<?php endforeach ?>
					</tr>
				<?php endforeach ?>
			</tbody>
		</table>
	</section>
<?php endif ?>
