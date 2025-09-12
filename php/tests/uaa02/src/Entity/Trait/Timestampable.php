<?php

namespace App\Entity\Trait;

use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;

trait Timestampable
{
    /**
     * Champ de création
     * @var DateTimeImmutable|null
     */
	#[ORM\Column]
	private ?DateTimeImmutable $createdAt = null;

    /**
     * Champ de mise à jour
     * @var DateTimeImmutable|null
     */
	#[ORM\Column]
	private ?DateTimeImmutable $updatedAt = null;

    // --------------- //
    // Getter | Setter //
    // --------------- //

	public function getCreatedAt(): ?DateTimeImmutable
	{
		return $this->createdAt;
	}

	public function setCreatedAt(DateTimeImmutable $createdAt): static
	{
		$this->createdAt = $createdAt;
		return $this;
	}

	public function getUpdatedAt(): ?DateTimeImmutable
	{
		return $this->updatedAt;
	}

	public function setUpdatedAt(DateTimeImmutable $updatedAt): static
	{
		$this->updatedAt = $updatedAt;
		return $this;
	}

    /**
     * Mise à jour des timestamps à chaque mis à jour
     * @return void
     */
	#[ORM\PrePersist, ORM\PreUpdate]
	public function updateTimestamps(): void
	{
		if ($this->getCreatedAt() === null) {
			$this->setCreatedAt(new \DateTimeImmutable);
		}
		$this->setUpdatedAt(new \DateTimeImmutable);
	}
}
