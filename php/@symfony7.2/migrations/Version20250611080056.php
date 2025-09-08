<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250611080056 extends AbstractMigration
{
	public function getDescription(): string
	{
		return 'Ajoute une image dans la table des recettes';
	}

	public function up(Schema $schema): void
	{
		// this up() migration is auto-generated, please modify it to your needs
		$this->addSql(
			<<<'SQL'
            ALTER TABLE recipes ADD image_name VARCHAR(500) DEFAULT NULL
        SQL,
		);
	}

	public function down(Schema $schema): void
	{
		// this down() migration is auto-generated, please modify it to your needs
		$this->addSql(
			<<<'SQL'
            ALTER TABLE recipes DROP image_name
        SQL,
		);
	}
}
