<?php

require_once "./app/Auth.php";

class CurrencyConversionAction {
	public function __construct(
		private Auth $auth,
		private float $amount,
		private string $currency_from,
		private string $currency_to,
	) {
	}
}

$auth = new Auth;

if (!$auth->is_connected()) {
	$auth->redirect_signin();
}

$currency_conv = new CurrencyConversionAction(
	auth: $auth,
	amount: (float) $_POST["amount"],
	currency_from: $_POST["currency_from"],
	currency_to: $_POST["currency_to"],
);

var_dump(
	$currency_conv,
);

