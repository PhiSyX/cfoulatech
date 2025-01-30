<?php

$currencies_rates = [
	"USD" => 1.08,
	"YEN" => 129.53,
	"GBP" => 0.85,
	"RDC" => 2200,
	"DIR" => 10.89,
	"AUD" => 1.62
];

if (isset($_POST["amount"])) {
	$amount = (float) $_POST["amount"];
	$currency_to = strtoupper($_POST["currency_to"]);
	$converted = $amount * $currencies_rates[$currency_to];

	var_dump($converted);
}

?><!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Mikonvertica</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>

	<main class="container" role="main">

		<dialog id="currency-converter" open>
			<h1>Mikonvertica</h1>

			<form action="index.php" method="POST">
				<div class="form-group">
					<label for="js-amount">Enter amount</label>
					<input
						id="js-amount"
						name="amount"
						type="number"
						step="0.01"
						value="<?php if (isset($amount)) { echo $amount; } ?>"
					>
				</div>

				<div class="form-group-inline">
					<div class="form-group">
						<label for="js-curr-to">To</label>
						<select name="currency_to" id="js-curr-to">
							<?php foreach ($currencies_rates as $currency => $_) : ?>
								<option value="<?= strtolower($currency) ?>">
									<?= $currency ?>
								</option>
							<?php endforeach ?>
						</select>
					</div>
				</div>

				<button type="submit">Convert now</button>
			</form>

		</dialog>
	</main>

</body>
</html>
