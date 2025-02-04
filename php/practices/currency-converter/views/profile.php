<?php
require_once "./app/Auth.php";

$auth = new Auth;

if (!$auth->is_connected()) {
	$auth->redirect_signin();
}

$nav = "profile";
?>
<?php include "./views/layouts/header.php"; ?>

<div class="page-profile">
	<h1>Profile</h1>

	<section>
		<?php if (isset($_SESSION["currency_result"])): ?>
			<h2>History of your currency conversion</h2>

			<div class="currency-conversion-history">
				<table>
					<thead>
						<tr>
							<th>Amount</th>
							<th>Currency from</th>
							<th>Currency to</th>
							<th>Result</th>
							<th>Actions</th>
						</tr>
					</thead>

					<tbody>
						<?php foreach ($_SESSION["currency_result"] as $conversion): ?>
							<tr>
								<td><?= $conversion["amount"]; ?></td>
								<td><?= $conversion["from"]; ?></td>
								<td><?= $conversion["to"]; ?></td>
								<td><?= $conversion["result"][0]; ?></td>

								<td>
									<button>Delete</button>
								</td>
							</tr>
						<?php endforeach; ?>
					</tbody>
				</table>
			</div>
		<?php endif; ?>
	</section>

</div>

<?php include "./views/layouts/footer.php"; ?>
