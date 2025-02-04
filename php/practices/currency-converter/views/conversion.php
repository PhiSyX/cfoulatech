<?php

require_once "./app/Currency.php";
require_once "./app/Page.php";

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

	public function lastConversion(): array|bool
	{
		if (session_status() === PHP_SESSION_NONE) {
			session_start();
		}
		if (!isset($_SESSION["currency_result"])) {
			return false;
		}
		return end($_SESSION["currency_result"]);
	}

	public function currenciesList(): array
	{
		return $this->currency->getCurrencies();
	}
}

$page = new PageConversion;
$page->requiredAuth();

$lastConversion = $page->lastConversion();

include "./views/layouts/header.php";
?>

<link rel="stylesheet" href="assets/css/conversion.css">

<dialog id="currency-converter" open>
	<h1><?= $page->getTitle() ?></h1>

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
					<?php foreach ($page->currenciesList() as $currency) : ?>
						<option
							value="<?php echo strtolower($currency) ?>"
							<?php
							if (
								isset($_POST["currency_from"])      &&
								strtoupper($_POST["currency_from"]) == strtoupper($currency)
							):
							?>
							selected="selected"
							<?php
							elseif (
								!isset($_POST["currency_from"]) &&
								"EUR" == strtoupper($currency)
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
					<?php foreach ($page->currenciesList() as $currency) : ?>
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

	<?php if ($lastConversion !== false): ?>
		<hr>

		<details open>
			<summary>Dernière conversion</summary>

			<ul>
				<li>
					<strong>
						<?= $lastConversion["amount"] ?> (<?= $lastConversion["from"] ?>)
					</strong>

					en

					<strong><?php echo $lastConversion["to"] ?></strong>

					équivaut à

					<strong>
						<?= $lastConversion["result"][0] ?>
					</strong>
				</li>
				<li>
					<strong>
						<?= $lastConversion["amount"] ?> (<?= $lastConversion["to"] ?>)
					</strong>

					en

					<strong><?= $lastConversion["from"] ?></strong>

					équivaut à

					<strong>
						<?= $lastConversion["result"][1] ?>
					</strong>
				</li>
			</ul>
		</details>
	<?php endif ?>

</dialog>

<?php include "./views/layouts/footer.php"; ?>
