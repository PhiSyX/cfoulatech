<?php

class Currency
{
	// --------- //
	// Propriété //
	// --------- //

	/**
	 * Taux de conversions
	 */
	private array $rates = [
		"USD" => 1.08,
		"YEN" => 129.53,
		"GBP" => 0.85,
		"RDC" => 2200,
		"DIR" => 10.89,
		"AUD" => 1.62
	];

	/**
	 * Les symboles des différentes monnaies.
	 */
	private array $symbols = [
		"EUR" => "€",
		"USD" => "$",
		"YEN" => "¥",
		"GBP" => "£",
		"RDC" => "CDF",
		"DIR" => "د.إ",
		"AUD" => "$",
	];

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function getRates(): array
	{
		return $this->rates;
	}

	public function getSymbol( string $currency_name ) : string | null
	{
		return isset($this->symbols[$currency_name])
			? $this->symbols[$currency_name]
			:  null;
	}

	public function getAmount( string $amount, string $currency_name ) : string
	{
		return $amount . $this->getSymbol($currency_name);
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function convert(
		float $amount,
		string $to,
		string $from = "EUR"
	): string
	{
		$converted = $amount * $this->rates[$to];

		$this->saveToSession(
			$amount,
			$from,
			$to,
			$converted,
		);

		return $converted;
	}

	private function saveToSession(
		float $amount,
		string $from,
		string $to,
		float $result
	)
	{
		if (session_status() === PHP_SESSION_NONE) {
			session_start();
		}

		$_SESSION["currency_result"][] = [
			"amount" => $amount,
			"from" 	 => $from,
			"to"     => $to,
			"result" => $result,
		];
	}
}
