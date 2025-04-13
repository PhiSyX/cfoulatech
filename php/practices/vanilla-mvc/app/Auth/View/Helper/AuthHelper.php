<?php

namespace App\Auth\View\Helper;

use App\Auth\AuthConfig;
use App\Auth\AuthSession;
use App\Auth\Model\Entity\User;

class AuthHelper
{
	private AuthConfig $authConfig;
	private AuthSession $authSession;

	public function __construct(AuthConfig $authConfig, AuthSession $authSession)
	{
		$this->authConfig = $authConfig;
		$this->authSession = $authSession;
	}

	/**
	 * Utilisateur courant, si existe dans la session
	 */
	public function currentUser(): ?User
	{
		return $this->authSession->get();
	}

	/**
	 * Vérifie si un utilisateur existe dans la session
	 */
	public function isConnected(): bool
	{
		return $this->authSession->exists();
	}

	public function useLogoutComponent(
		string $username,
		array  $options = [],
	): void
	{
		$btnText = isset($options["button"]) ? $options["button"] : "Se déconnecter maintenant";
		$class = isset($options["class"]) ? $options["class"] : "";
		?>
		<form action="<?= $this->authConfig->getLogoutPath() ?>" method="post">
			<?php if (isset($options["label"])): ?>
				<?php if ($options["label"] === true): ?>
					<p>
						Vous êtes connecté(e) en tant que
						<strong><?= $username ?></strong> !
					</p>
				<?php else: ?>
					<p><?= $options["options"] ?></p>
				<?php endif ?>
			<?php endif ?>

			<button type="submit" class="<?= $class ?>">
				<?= $btnText ?>
			</button>
		</form>
		<?php
	}

}
