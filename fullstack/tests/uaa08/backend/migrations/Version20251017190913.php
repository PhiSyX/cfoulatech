<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20251017190913 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Tables liées aux annonces';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE adresses (id INT AUTO_INCREMENT NOT NULL, rue VARCHAR(255) NOT NULL, numero VARCHAR(10) NOT NULL, pays VARCHAR(255) NOT NULL, ville VARCHAR(255) NOT NULL, geoloc_gps VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_ADDRESS (rue, numero), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE annonces (id INT AUTO_INCREMENT NOT NULL, utilisateur_id INT NOT NULL, propriete_id INT NOT NULL, message LONGTEXT NOT NULL, type VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_CB988C6FFB88E14F (utilisateur_id), UNIQUE INDEX UNIQ_CB988C6F18566CAF (propriete_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE proprietes (id INT AUTO_INCREMENT NOT NULL, adresse_id INT NOT NULL, proprietaire_id INT NOT NULL, type VARCHAR(255) NOT NULL, prix DOUBLE PRECISION NOT NULL, surface_m2 DOUBLE PRECISION NOT NULL, nombre_pieces INT NOT NULL, nombre_chambres INT NOT NULL, titre VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', updated_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', UNIQUE INDEX UNIQ_727BA5AE4DE7DC5C (adresse_id), INDEX IDX_727BA5AE76C50E4A (proprietaire_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE proprietes_photos (id INT AUTO_INCREMENT NOT NULL, propriete_id INT DEFAULT NULL, photo_id INT NOT NULL, principale TINYINT(1) DEFAULT NULL, INDEX IDX_E03496FD18566CAF (propriete_id), INDEX IDX_E03496FD7E9E4C8C (photo_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE annonces ADD CONSTRAINT FK_CB988C6FFB88E14F FOREIGN KEY (utilisateur_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE annonces ADD CONSTRAINT FK_CB988C6F18566CAF FOREIGN KEY (propriete_id) REFERENCES proprietes (id)');
        $this->addSql('ALTER TABLE proprietes ADD CONSTRAINT FK_727BA5AE4DE7DC5C FOREIGN KEY (adresse_id) REFERENCES adresses (id)');
        $this->addSql('ALTER TABLE proprietes ADD CONSTRAINT FK_727BA5AE76C50E4A FOREIGN KEY (proprietaire_id) REFERENCES users (id)');
        $this->addSql('ALTER TABLE proprietes_photos ADD CONSTRAINT FK_E03496FD18566CAF FOREIGN KEY (propriete_id) REFERENCES proprietes (id)');
        $this->addSql('ALTER TABLE proprietes_photos ADD CONSTRAINT FK_E03496FD7E9E4C8C FOREIGN KEY (photo_id) REFERENCES photos (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE annonces DROP FOREIGN KEY FK_CB988C6FFB88E14F');
        $this->addSql('ALTER TABLE annonces DROP FOREIGN KEY FK_CB988C6F18566CAF');
        $this->addSql('ALTER TABLE proprietes DROP FOREIGN KEY FK_727BA5AE4DE7DC5C');
        $this->addSql('ALTER TABLE proprietes DROP FOREIGN KEY FK_727BA5AE76C50E4A');
        $this->addSql('ALTER TABLE proprietes_photos DROP FOREIGN KEY FK_E03496FD18566CAF');
        $this->addSql('ALTER TABLE proprietes_photos DROP FOREIGN KEY FK_E03496FD7E9E4C8C');
        $this->addSql('DROP TABLE adresses');
        $this->addSql('DROP TABLE annonces');
        $this->addSql('DROP TABLE proprietes');
        $this->addSql('DROP TABLE proprietes_photos');
    }
}
