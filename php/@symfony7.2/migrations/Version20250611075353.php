<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250611075353 extends AbstractMigration
{
	public function getDescription(): string
	{
		return 'Rend le champ title unique';
	}

	public function up(Schema $schema): void
	{
		// this up() migration is auto-generated, please modify it to your needs
		$this->addSql(<<<'SQL'
            CREATE UNIQUE INDEX UNIQ_A369E2B52B36786B ON recipes (title)
        SQL,
		);
	}

	public function down(Schema $schema): void
	{
		// this down() migration is auto-generated, please modify it to your needs
		$this->addSql(<<<'SQL'
            DROP INDEX UNIQ_A369E2B52B36786B ON recipes
        SQL,
		);
	}
}
