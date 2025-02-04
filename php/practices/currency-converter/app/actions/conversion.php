<?php

require_once "./app/Auth.php";
require_once "./app/Currency.php";

class CurrencyConversionAction
{
	public function __construct(
		private Auth $auth,
		private Currency $currency,
		private float $amount,
		private string $currency_from,
		private string $currency_to,
	) {}

	public function validate(): array|bool
	{
		$errors = [];

		if ($this->amount <= 0.0) {
			$errors["amount"] = "The amount cannot be equal to 0";
		}

		$currencies = $this->currency->get_currencies();

		if (!in_array(strtoupper($this->currency_from), $currencies)) {
			$errors["currency_from"] = "The currency you have entered is invalid. " . "Valid currencies are : " . join(",", $currencies);
		}

		if (!in_array(strtoupper($this->currency_to), $currencies)) {
			$errors["currency_to"] = "The currency you have entered is invalid. " . "Valid currencies are : " . join(",", $currencies);
		}

		if (count($errors) > 0) {
			return $errors;
		}

		return false;
	}

	public function save(): void
	{
		$this->currency->convert(
			$this->amount,
			strtoupper($this->currency_from),
			strtoupper($this->currency_to),
		);
	}
}

$auth = new Auth;

if (!$auth->is_connected()) {
	$auth->redirect_signin();
}

$action = new CurrencyConversionAction(
	auth: $auth,
	currency: new Currency,
	amount: (float) $_POST["amount"],
	currency_from: $_POST["currency_from"],
	currency_to: $_POST["currency_to"],
);

$errors = $action->validate();

if ($errors === false) {
	$action->save();
}

require "./views/conversion.php";
