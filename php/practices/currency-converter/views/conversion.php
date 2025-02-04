<?php

require_once "./views/Page.php";
require_once "./app/Currency.php";

class PageConversion extends Page
{
	private Currency $currency;

	public function __construct()
	{
		parent::__construct("conversion", "Mikonvertika");
		$this->currency = new Currency();
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function last_conversion(): array|bool
	{
		if (session_status() === PHP_SESSION_NONE) {
			session_start();
		}
		if (!isset($_SESSION["currency_result"])) {
			return false;
		}
		return end($_SESSION["currency_result"]);
	}

	public function currencies_list(): array
	{
		return $this->currency->get_currencies();
	}
}

$page = new PageConversion;
$page->required_auth();

$last_conversion = $page->last_conversion();

include "./views/layouts/header.php";
?>

<link rel="stylesheet" href="assets/css/conversion.css">

<dialog id="currency-converter" open>
	<h1><?= $page->get_title() ?></h1>

	<form action="?action=conversion" method="POST">
		<div class="form-group">
			<label for="js-amount">Enter amount</label>
			<input
				id="js-amount"
				name="amount"
				type="number"
				step="0.01"

				<?php if (isset($_POST["amount"])): ?>
				value="<?php echo (float)$_POST["amount"] ?>"
				<?php endif ?>>
			<?= isset($errors) ? error($errors, "amount") : null ?>
		</div>

		<div class="form-group-inline">
			<div class="form-group">
				<label for="js-curr-from">From</label>
				<select name="currency_from" id="js-curr-from">
					<?php foreach ($page->currencies_list() as $currency) : ?>
						<option
							value="<?php echo strtolower($currency) ?>"
							<?php
							if (
								isset($_POST["currency_from"])      &&
								strtoupper($_POST["currency_from"]) == strtoupper($currency)
							):
							?>
							selected="selected"
							<?php endif ?>>
							<?php echo $currency ?>
						</option>
					<?php endforeach ?>
				</select>
				<?= isset($errors) ? error($errors, "currency_from") : null ?>
			</div>

			<div>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9 15.5H19V2.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M15 10.5H5V21.5M22 5.5L19 2.5L16 5.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M8 18.5L5 21.5L2 18.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				</svg>

			</div>

			<div class="form-group">
				<label for="js-curr-to">To</label>
				<select name="currency_to" id="js-curr-to">
					<?php foreach ($page->currencies_list() as $currency) : ?>
						<option
							value="<?php echo strtolower($currency) ?>"
							<?php
							if (
								isset($_POST["currency_to"])      &&
								strtoupper($_POST["currency_to"]) == strtoupper($currency)
							):
							?>
							selected="selected"
							<?php endif ?>>
							<?php echo $currency ?>
						</option>
					<?php endforeach ?>
				</select>
				<?= isset($errors) ? error($errors, "currency_to") : null ?>
			</div>
		</div>

		<button type="submit">Convert now</button>
	</form>

	<?php if ($last_conversion !== false): ?>
		<hr>

		<details open>
			<summary>Dernière conversion</summary>

			<ul>
				<li>
					<strong>
						<?= $last_conversion["amount"] ?> (<?= $last_conversion["from"] ?>)
					</strong>

					en

					<strong><?php echo $last_conversion["to"] ?></strong>

					équivaut à

					<strong>
						<?= $last_conversion["result"][0] ?>
					</strong>
				</li>
				<li>
					<strong>
						<?= $last_conversion["amount"] ?> (<?= $last_conversion["to"] ?>)
					</strong>

					en

					<strong><?= $last_conversion["from"] ?></strong>

					équivaut à

					<strong>
						<?= $last_conversion["result"][1] ?>
					</strong>
				</li>
			</ul>
		</details>
	<?php endif ?>

</dialog>

<?php include "./views/layouts/footer.php"; ?>
