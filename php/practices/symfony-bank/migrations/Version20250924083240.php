<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250924083240 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Cart Bank';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `cartes_bancaire` (id INT AUTO_INCREMENT NOT NULL, proprietaire_id INT NOT NULL, numero VARCHAR(255) NOT NULL, expire_le DATE NOT NULL COMMENT \'(DC2Type:date_immutable)\', bic VARCHAR(255) NOT NULL, iban VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_4E9ED66A76C50E4A (proprietaire_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `cartes_bancaire` ADD CONSTRAINT FK_4E9ED66A76C50E4A FOREIGN KEY (proprietaire_id) REFERENCES `users` (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `cartes_bancaire` DROP FOREIGN KEY FK_4E9ED66A76C50E4A');
        $this->addSql('DROP TABLE `cartes_bancaire`');
    }
}
