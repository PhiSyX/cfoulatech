<?php

session_start();

// Détruit la session si ?session_destroy est dans l'URL.
if (isset($_GET["session_destroy"])) {
	session_destroy();

	// Redirige vers l'accueil pour retirer le `?session_destroy` de l'URL.
	header("Location: index.php");
	exit;
}

require_once "./src/Currency.php";

$curr = new Currency();

if (isset($_POST["amount"]) && (float) $_POST["amount"] > 0.0) {
	// J'ai besoin de ces variables plus bas dans le code HTML.
	$amount = (float) $_POST["amount"];
	$currency_from = "EUR";
	$currency_to = strtoupper($_POST["currency_to"]);

	// Conversion
	$curr->convert(
		amount: $amount,
		to:   	$currency_to,
		from: 	$currency_from,
	);
}

include "./includes/layouts/header.php";
?>
<dialog id="currency-converter" open>
	<h1>Mikonvertica</h1>

	<form action="" method="POST">
		<input type="hidden" name="page" value="val">
		<div class="form-group">
			<label for="js-amount">Enter amount (EUR)</label>
			<input
				id="js-amount"
				name="amount"
				type="number"
				step="0.01"

				<?php if (isset($amount)): ?>
				value="<?php echo $amount ?>"
				<?php endif ?>
			>
		</div>

		<div class="form-group-inline">
			<div class="form-group">
				<label for="js-curr-to">To</label>
				<select name="currency_to" id="js-curr-to">
					<?php foreach ($curr->getRates() as $currency => $_) : ?>
						<option
							value="<?php echo strtolower($currency) ?>"
							<?php
							if (
								isset($currency_to)		 &&
								strtoupper($currency_to) == strtoupper($currency)
							):
							?>
								selected="selected"
							<?php endif ?>
						>
							<?php echo $currency ?>
						</option>
					<?php endforeach ?>
				</select>
			</div>
		</div>

		<button type="submit">Convert now</button>
	</form>

<?php if (isset($_SESSION["currency_result"])): ?>
	<hr>

	<details open>
		<summary>Historique des conversions</summary>

		<ul>
			<?php foreach ($_SESSION["currency_result"] as $currency): ?>
				<li>
					<strong>
						<?php
						echo $curr->getAmount(
							$currency["amount"],
							$currency["from"]
						);
						?>
					</strong>

					en

					<span>
						<?php echo $currency["to"] ?>
						(<?php echo $curr->getSymbol($currency["to"]) ?>)
					</span>

					équivaut à

					<strong>
						<?php
						echo $curr->getAmount(
							$currency["result"],
							$currency["to"],
						);
						?>
					</strong>
				</li>
			<?php endforeach ?>
		</ul>
	</details>
<?php endif ?>

</dialog>

<?php include "./includes/layouts/footer.php"; ?>
