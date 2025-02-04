<?php
require_once "./app/Currency.php";
require_once "./app/Page.php";

class PageProfile extends Page
{
	private Currency $currency;

	public function __construct()
	{
		parent::__construct("profile", "My Profile");
		$this->currency = new Currency;
	}

	public function conversionsList(): array
	{
		$user_id = $this->getUserId();

		if (!$user_id) {
			return [];
		}

		return $this->currency->all($user_id);
	}
}

$page = new PageProfile;
$page->requiredAuth();
?>
<?php include "./views/layouts/header.php"; ?>

<div class="page-profile">
	<h1>Profile</h1>

	<section>
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
					<?php foreach ($page->conversionsList() as $conversion): ?>
						<tr>
							<td><?= $conversion["amount"]; ?></td>
							<td><?= $conversion["from"]; ?></td>
							<td><?= $conversion["to"]; ?></td>
							<td><?= $conversion["result"][0]; ?></td>

							<td>
								<form action="?action=conversion_delete" method="POST">
									<input type="hidden" name="conversion_id" value="<?= $conversion["id"]; ?>">
									<button type="submit">Delete</button>
								</form>
							</td>
						</tr>
					<?php endforeach; ?>
				</tbody>
			</table>
		</div>
	</section>

</div>

<?php include "./views/layouts/footer.php"; ?>
