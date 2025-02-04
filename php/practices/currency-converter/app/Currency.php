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
		/*
		'AUD' => 1.6629,
		'BGN' => 1.9558,
		'BRL' => 6.0138,
		'CAD' => 1.4894,
		'CHF' => 0.9396,
		'CNY' => 7.4943,
		'CZK' => 25.172,
		'DKK' => 7.461,
		'EUR' => 1,
		'GBP' => 0.83188,
		'HKD' => 8.0489,
		'HUF' => 407.15,
		'IDR' => 16865,
		'ILS' => 3.6961,
		'INR' => 90.01,
		'ISK' => 146.8,
		'JPY' => 160.52,
		'KRW' => 1504.21,
		'MXN' => 21.132,
		'MYR' => 4.5929,
		'NOK' => 11.721,
		'NZD' => 1.8418,
		'PHP' => 60.222,
		'PLN' => 4.2193,
		'RON' => 4.9769,
		'SEK' => 11.418,
		'SGD' => 1.4015,
		'THB' => 34.937,
		'TRY' => 37.155,
		'USD' => 1.0335,
		'ZAR' => 19.4072,
		*/];

	private PDO $database;

	// ----------- //
	// Constructor //
	// ----------- //

	public function __construct()
	{
		$this->database = new PDO('mysql:dbname=tp_currency_converter;host=localhost', "root", "");
		$this->database->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$this->database->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function get_rates(): array
	{
		$this->rates = $this->from_api("rates", "/v1/latest");
		$this->rates["EUR"] = 1.0;
		return $this->rates;
	}

	public function get_currencies(): array
	{
		return array_keys($this->get_rates());
	}

	// ------- //
	// Méthode // -> API Publique
	// ------- //

	public function all(int $user_id): array
	{
		try {
			$req = $this->database->prepare(
				"
				SELECT
					amount,
					currency_from AS 'from',
					currency_to   AS 'to'
				FROM conversions
				WHERE user_id = :user_id
				"
			);

			$req->execute(["user_id" => $user_id]);

			$data = [];

			foreach ($req->fetchAll(PDO::FETCH_ASSOC) as $item) {
				$item["result"] = $this->convert(
					$item["amount"],
					$item["from"],
					$item["to"],
					save: false,
				);
				$data[] = $item;
			}

			return $data;
		} catch (PDOException $error) {
			return [];
		}
	}

	public function convert(
		float $amount,
		string $from,
		string $to,
		bool $save = true,
	): array {
		$converted1 = $this->from_api(
			$amount . "_" . $from . "_" . $to,
			"/v1/latest?amount=$amount&base=$from&symbols=$to"
		)[$to];

		$converted2 = $this->from_api(
			$amount . "_" . $to . "_" . $from,
			"/v1/latest?amount=$amount&base=$to&symbols=$from"
		)[$from];

		if ($save) {
			$this->save_to_session(
				$amount,
				$from,
				$to,
				[$converted1, $converted2],
			);

			$this->save_to_database(
				$amount,
				$from,
				$to,
				[$converted1, $converted2],
			);
		}

		return [$converted1, $converted2];
	}

	private function save_to_database(
		float $amount,
		string $from,
		string $to,
		array $result
	) {
		$req = $this->database->prepare(
			"
			INSERT INTO conversions (
				amount,
				currency_from,
				currency_to,
				user_id
			) VALUES (
				:amount,
				:currency_from,
				:currency_to,
				:user_id
			)
			 "
		);

		try {
			return $req->execute([
				"amount" => $amount,
				"currency_from" => $from,
				"currency_to" => $to,
				"user_id" => $_SESSION["user"]->get_id(),
			]);
		} catch (PDOException $error) {
			return false;
		}
	}

	private function save_to_session(
		float $amount,
		string $from,
		string $to,
		array $result
	) {
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

	private function from_api(string $name, string $path): mixed
	{
		if (session_status() === PHP_SESSION_NONE) {
			session_start();
		}

		$url = "https://api.frankfurter.dev" . $path;
		if (isset($_SESSION[$name])) {
			return $_SESSION[$name];
		}
		$result = file_get_contents($url);
		$data = json_decode($result, true)["rates"];
		$_SESSION[$name] = $data;
		return $data;
	}
}
