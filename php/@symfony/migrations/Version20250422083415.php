<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250422083415 extends AbstractMigration
{
	public function getDescription(): string
	{
		return 'Ajoute une durée à aux recettes';
	}

	public function up(Schema $schema): void
	{
		// this up() migration is auto-generated, please modify it to your needs
		$this->addSql(<<<'SQL'
            ALTER TABLE recipes ADD duration INT DEFAULT NULL
        SQL,
		);
	}

	public function down(Schema $schema): void
	{
		// this down() migration is auto-generated, please modify it to your needs
		$this->addSql(<<<'SQL'
            ALTER TABLE recipes DROP duration
        SQL,
		);
	}
}
