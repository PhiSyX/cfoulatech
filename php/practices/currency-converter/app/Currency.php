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
		"EUR" => 1,
		"USD" => 1.003,
		"JPY" => 160.3,
		"GBP" => 0.8306,
		"CDF" => 2951,
		"DIR" => 10.38,
		"AUD" => 1.661
	];

	/**
	 * Les symboles des différentes monnaies.
	 */
	private array $symbols = [
		"EUR" => "€",
		"USD" => "$",
		"JPY" => "¥",
		"GBP" => "£",
		"CDF" => "CDF",
		"DIR" => "د.إ",
		"AUD" => "$",
	];

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function get_rates(): array
	{
		return $this->rates;
	}

	public function get_symbol( string $currency_name ) : string | null
	{
		return isset($this->symbols[$currency_name])
			? $this->symbols[$currency_name]
			:  null;
	}

	public function get_amount( string $amount, string $currency_name ) : string
	{
		return $amount . $this->get_symbol($currency_name);
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function convert(
		float $amount,
		string $from,
		string $to,
	): array
	{
		$converted1 = $amount * $this->rates[$to];
		$converted2 = $amount * ($this->rates[$from] / $converted1);

		$this->save_to_session(
			$amount,
			$from,
			$to,
			[$converted1, $converted2],
		);

		return [$converted1, $converted2];
	}

	private function save_to_session(
		float $amount,
		string $from,
		string $to,
		array $result
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
