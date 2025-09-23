<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250922074430 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create all tables';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `smartphones` (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, marque VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, annee INT NOT NULL, duo_carte_sim TINYINT(1) NOT NULL, image VARCHAR(500) NOT NULL, prix DOUBLE PRECISION NOT NULL, stock INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `tvs` (id INT AUTO_INCREMENT NOT NULL, nom VARCHAR(255) NOT NULL, marque VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, annee INT NOT NULL, taille INT NOT NULL, prix DOUBLE PRECISION NOT NULL, stock INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `users` (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, nom VARCHAR(255) NOT NULL, prenom VARCHAR(255) NOT NULL, adresse VARCHAR(500) NOT NULL, argent DOUBLE PRECISION NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_EMAIL (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_tv (user_id INT NOT NULL, tv_id INT NOT NULL, INDEX IDX_ABBBCEC1A76ED395 (user_id), INDEX IDX_ABBBCEC11D245270 (tv_id), PRIMARY KEY(user_id, tv_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_smartphone (user_id INT NOT NULL, smartphone_id INT NOT NULL, INDEX IDX_81D7B8C2A76ED395 (user_id), INDEX IDX_81D7B8C22E4F4908 (smartphone_id), PRIMARY KEY(user_id, smartphone_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_tv ADD CONSTRAINT FK_ABBBCEC1A76ED395 FOREIGN KEY (user_id) REFERENCES `users` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_tv ADD CONSTRAINT FK_ABBBCEC11D245270 FOREIGN KEY (tv_id) REFERENCES `tvs` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_smartphone ADD CONSTRAINT FK_81D7B8C2A76ED395 FOREIGN KEY (user_id) REFERENCES `users` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_smartphone ADD CONSTRAINT FK_81D7B8C22E4F4908 FOREIGN KEY (smartphone_id) REFERENCES `smartphones` (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_tv DROP FOREIGN KEY FK_ABBBCEC1A76ED395');
        $this->addSql('ALTER TABLE user_tv DROP FOREIGN KEY FK_ABBBCEC11D245270');
        $this->addSql('ALTER TABLE user_smartphone DROP FOREIGN KEY FK_81D7B8C2A76ED395');
        $this->addSql('ALTER TABLE user_smartphone DROP FOREIGN KEY FK_81D7B8C22E4F4908');
        $this->addSql('DROP TABLE `smartphones`');
        $this->addSql('DROP TABLE `tvs`');
        $this->addSql('DROP TABLE `users`');
        $this->addSql('DROP TABLE user_tv');
        $this->addSql('DROP TABLE user_smartphone');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
