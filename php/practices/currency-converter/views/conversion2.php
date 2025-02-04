<?php

// $curr = new Currency();

// if (isset($_GET["amount"]) && (float) $_GET["amount"] > 0.0) {
// 	// J'ai besoin de ces variables plus bas dans le code HTML.
// 	$amount = (float) $_GET["amount"];
// 	$currency_from = strtoupper($_GET["currency_from"]);
// 	$currency_to = strtoupper($_GET["currency_to"]);

// 	// Conversion
// 	$curr->convert(
// 		amount: $amount,
// 		from: $currency_from,
// 		to: $currency_to,
// 	);
// }

?>

<link rel="stylesheet" href="assets/css/conversion.css">

<dialog id="currency-converter" open>
	<h1>Mikonvertika</h1>

	<form action="?action=conversion" method="POST">
		<div class="form-group">
			<label for="js-amount">
				Enter amount
			</label>

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
				<label for="js-curr-from">From</label>
				<select name="currency_from" id="js-curr-from">
					<?php foreach ($curr->get_rates() as $currency => $_) : ?>
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
					<?php foreach ($curr->get_rates() as $currency => $_) : ?>
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

			<?php $last_conversion = end($_SESSION["currency_result"]); ?>
			<ul>
				<li>
					<strong>
						<?= $curr->get_amount(
							$last_conversion["amount"],
							$last_conversion["from"]
						) ?> (<?= $last_conversion["from"] ?>)
					</strong>

					en

					<strong><?php echo $last_conversion["to"] ?></strong>

					équivaut à

					<strong>
						<?= $curr->get_amount(
							$last_conversion["result"][0],
							$last_conversion["to"],
						) ?>
					</strong>
				</li>
				<li>
					<strong>
						<?= $curr->get_amount(
							$last_conversion["amount"],
							$last_conversion["to"]
						) ?> (<?= $last_conversion["to"] ?>)
					</strong>

					en

					<strong><?= $last_conversion["from"] ?></strong>

					équivaut à

					<strong>
						<?= $curr->get_amount(
							$last_conversion["result"][1],
							$last_conversion["from"],
						) ?>
					</strong>
				</li>
			</ul>
		</details>
	<?php endif ?>

</dialog>

<?php include "./views/layouts/footer.php"; ?>
