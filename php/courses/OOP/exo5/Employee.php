<?php

class Employee
{
	// --------- //
	// Propriété //
	// --------- //

	private string $registration_number;
	private string $lastname;
	private string $firstname;
	private DateTimeInterface $birthday_date;
	private DateTimeInterface $hiring_date;
	private float $salary;
	private DateTimeInterface $now;

	// ----------- //
	// Constructor //
	// ----------- //

	/**
	 * On ne dépend pas directement de DateTime, mais plutôt de son interface.
	 * Comme ça, ça ne fait pas de dépendance directe avec la classe. La classe
	 * devient plus testable.
	 */
	public function __construct(
		string            $registration_number,
		string            $lastname,
		string            $firstname,
		DateTimeInterface $birthday_date,
		DateTimeInterface $hiring_date,
		float             $salary,
		DateTimeInterface $now = new DateTime("now")
	)
	{
		$this->registration_number = $registration_number;
		$this->lastname = $lastname;
		$this->firstname = $firstname;
		$this->birthday_date = $birthday_date;
		$this->hiring_date = $hiring_date;
		$this->salary = $salary;
		$this->now = $now;
	}

	// --------------- //
	// Getter | Setter //
	// --------------- //

	public function setNow(DateTimeInterface $now): void
	{
		$this->now = $now;
	}

	public function getRegistrationNumber(): string
	{
		return $this->registration_number;
	}

	public function setRegistrationNumber(string $registration_number): void
	{
		$this->registration_number = $registration_number;
	}

	public function getLastname(): string
	{
		return $this->lastname;
	}

	public function setLastname(string $lastname): void
	{
		$this->lastname = $lastname;
	}

	public function getPrenom(): string
	{
		return $this->firstname;
	}

	public function setFirstname(string $firstname): void
	{
		$this->firstname = $firstname;
	}

	public function getBirthdayDate(): DateTimeInterface
	{
		return $this->birthday_date;
	}

	public function setBirthdayDate(DateTimeInterface $birthday_date): void
	{
		$this->birthday_date = $birthday_date;
	}

	public function getHiringDate(): DateTimeInterface
	{
		return $this->hiring_date;
	}

	public function setHiringDate(DateTimeInterface $hiring_date): void
	{
		$this->hiring_date = $hiring_date;
	}

	public function getSalary(): float
	{
		return $this->salary;
	}

	public function setSalary(float $salary): void
	{
		$this->salary = $salary;
	}

	// ------- //
	// Méthode // -> Publique
	// ------- //

	public function increaseSalary(float $salary): void
	{
		$seniority = $this->getSeniority();

		$this->salary += $salary;

		if ($seniority < 5) {
			$this->salary *= 1 + 2 / 100;
		} elseif ($seniority < 10) {
			$this->salary *= 1 + 5 / 100;
		} else {
			$this->salary *= 1 + 10 / 100;
		}
	}

	public function getSeniority(): int
	{
		return $this->hiring_date->diff($this->now)->y;
	}

	public function display(): string
	{
		return "• Matricule : " . $this->registration_number . " <br>" .
			"• Nom complet : " . $this->lastname . " " . $this->firstname . " <br>" .
			"• Age : " . $this->getAge() . " ans <br>" .
			"• Ancienneté : " . $this->getSeniority() . " ans <br>" .
			"• Salaire : " . $this->salary . "€ <br><br>";
	}

	public function getAge(): int
	{
		return $this->birthday_date->diff($this->now)->y;
	}
}
