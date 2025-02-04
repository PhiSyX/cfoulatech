<?php
require_once "./app/Auth.php";

$auth = new Auth;

if (!$auth->is_connected()) {
	$auth->redirect_signin();
}

require_once "./app/Currency.php";

$nav = "conversion";

$curr = new Currency();

if (isset($_GET["amount"]) && (float) $_GET["amount"] > 0.0) {
	// J'ai besoin de ces variables plus bas dans le code HTML.
	$amount = (float) $_GET["amount"];
	$currency_from = strtoupper($_GET["currency_from"]);
	$currency_to = strtoupper($_GET["currency_to"]);

	// Conversion
	$curr->convert(
		amount: $amount,
		from: $currency_from,
		to: $currency_to,
	);
}

include "./views/layouts/header.php";
?>
<link rel="stylesheet" href="assets/css/conversion.css">
<dialog id="currency-converter" open>
	<h1>Mikonvertika</h1>

	<form action="" method="GET">
		<input type="hidden" name="page" value="conversion">
		<div class="form-group">
			<label for="js-amount">Enter amount</label>
			<input
				id="js-amount"
				name="amount"
				type="number"
				step="0.01"

				<?php if (isset($amount)): ?>
				value="<?php echo $amount ?>"
				<?php endif ?>>
		</div>

		<div class="form-group-inline">
			<div class="form-group">
				<label for="js-curr-from">From</label>
				<select name="currency_from" id="js-curr-from">
					<?php foreach ($curr->getRates() as $currency => $_) : ?>
						<option
							value="<?php echo strtolower($currency) ?>"
							<?php
							if (
								isset($currency_from)	   &&
								strtoupper($currency_from) == strtoupper($currency)
							):
							?>
							selected="selected"
							<?php endif ?>>
							<?php echo $currency ?>
						</option>
					<?php endforeach ?>
				</select>
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
							<?php endif ?>>
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
			<summary>Dernière conversion</summary>

			<?php $currency = end($_SESSION["currency_result"]); ?>
			<ul>
				<li>
					<strong>
						<?php
						echo $curr->getAmount(
							$currency["amount"],
							$currency["from"]
						);
						?> (<?= $currency["from"]; ?>)
					</strong>

					en

					<strong><?php echo $currency["to"] ?></strong>

					équivaut à

					<strong>
						<?php
						echo $curr->getAmount(
							$currency["result"][0],
							$currency["to"],
						);
						?>
					</strong>
				</li>
				<li>
					<strong>
						<?php
						echo $curr->getAmount(
							$currency["amount"],
							$currency["to"]
						);
						?> (<?= $currency["to"]; ?>)
					</strong>

					en

					<strong><?php echo $currency["from"] ?></strong>

					équivaut à

					<strong>
						<?php
						echo $curr->getAmount(
							$currency["result"][1],
							$currency["from"],
						);
						?>
					</strong>
				</li>
			</ul>
		</details>
	<?php endif ?>

</dialog>

<?php include "./views/layouts/footer.php"; ?>

<!--

// Define exchange rates dynamically
$exchangeRates = [
    "EUR_TO_JPY" => 160,  // Example: 1 EUR = 160 JPY
    "JPY_TO_EUR" => 1 / 160, // Reverse conversion
    "EUR_TO_USD" => 1.08,  // Example: 1 EUR = 1.08 USD
    "USD_TO_EUR" => 1 / 1.08 // Reverse conversion
];

// Function to convert currency dynamically
function convertCurrency($amount, $from, $to, $rates) {
    $key = strtoupper("{$from}_TO_{$to}");
    if (isset($rates[$key])) {
        return $amount * $rates[$key];
    } else {
        return "Conversion rate not available.";
    }
}

// Example amounts to convert
$amounts = [
    ["amount" => 10, "from" => "EUR", "to" => "JPY"],
    ["amount" => 2000, "from" => "JPY", "to" => "EUR"],
    ["amount" => 10, "from" => "EUR", "to" => "USD"],
    ["amount" => 50, "from" => "USD", "to" => "EUR"]
];

// Perform conversions dynamically
foreach ($amounts as $conversion) {
    $convertedAmount = convertCurrency($conversion["amount"], $conversion["from"], $conversion["to"], $exchangeRates);
    echo "{$conversion["amount"]} {$conversion["from"]} is equivalent to " . number_format($convertedAmount, 2) . " {$conversion["to"]}\n";
}

-->
