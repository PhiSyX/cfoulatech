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
		$this->currency->delete_from_database(
			$this->auth->get_user_session()->get_id(),
			$this->conversion_id
		);
		$this->auth->redirect_profile();
	}
}

$auth = new Auth;

if (!$auth->is_connected()) {
	$auth->redirect_signin();
}

$action = new ConversionDeleteAction(
	auth: $auth,
	currency: new Currency,
	conversion_id: (int) $_POST["conversion_id"],
);

$action->delete();

