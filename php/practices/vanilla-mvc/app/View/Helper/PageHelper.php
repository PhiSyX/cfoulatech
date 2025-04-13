<?php

namespace App\View\Helper;

class PageHelper
{
	private string $currentPageName = "";

	public function __construct(string $currentPageName)
	{
		$this->currentPageName = $currentPageName;
	}

	/**
	 * Vérifie qu'un nom de page donnée correspond à la page courante
	 */
	public function isCurrent(string $userPageName): bool
	{
		return $userPageName === $this->currentPageName;
	}

	/**
	 * Retourne l'attribut « aria-current » avec la valeur de « page » si la page
	 * donnée en argument de paramètre correspond à la page courante, sinon « false ».
	 */
	public function getCurrentAttribute(string $userPageName): string
	{
		return 'aria-current="' . ($this->isCurrent($userPageName) ? 'page' : 'false') . '"';
	}
}
