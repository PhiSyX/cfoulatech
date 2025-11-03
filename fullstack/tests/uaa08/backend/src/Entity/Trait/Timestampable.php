<?php

namespace App\Entity\Trait;

use DateTimeImmutable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

trait Timestampable
{
	#[ORM\Column]
    #[Groups(['user:read'])]
	private ?DateTimeImmutable $createdAt = null;

	#[ORM\Column]
    #[Groups(['user:read'])]
	private ?DateTimeImmutable $updatedAt = null;

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

	#[ORM\PrePersist, ORM\PreUpdate]
	public function updateTimestamps(): void
	{
		if ($this->getCreatedAt() === null) {
			$this->setCreatedAt(new \DateTimeImmutable);
		}
		$this->setUpdatedAt(new \DateTimeImmutable);
	}
}
