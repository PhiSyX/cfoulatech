<?php

require_once "./app/Auth.php";
require_once "./app/Currency.php";

class ConversionDeleteAction
{
	public function __construct(
		private Auth $auth,
		private Currency $currency,
		private int $conversion_id,
	) {}

	public function delete(): void
	{
		$this->currency->deleteFromDatabase(
			$this->auth->getUserSession()->getId(),
			$this->conversion_id
		);
		$this->auth->redirectProfile();
	}
}

$auth = new Auth;

if (!$auth->isConnected()) {
	$auth->redirectSignin();
}

$action = new ConversionDeleteAction(
	auth: $auth,
	currency: new Currency,
	conversion_id: (int) $_POST["conversion_id"],
);

$action->delete();

