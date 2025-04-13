<?php

namespace App\Auth\Service;

use App\Auth\Model\Entity\User;
use App\Auth\Model\Repository\UserRepository;

class AuthService
{
	private UserRepository $userRepository;

	public function __construct(UserRepository $userRepository)
	{
		$this->userRepository = $userRepository;
	}

	/**
	 * Tentative de connexion
	 */
	public function attemptLogin(string $username, string $password): User|false
	{
		$user = $this->userRepository->findByUsername($username);

		if (!$user) {
			return false;
		}

		if ($user->comparePassword($password) === false) {
			return false;
		}


		return $user;
	}

	// ------ //
	// Getter //
	// ------ //

	public function getUserRepository(): UserRepository
	{
		return $this->userRepository;
	}
}
