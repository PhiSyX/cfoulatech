<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250709093106 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Système de commentaire';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE recipes_comments (id INT AUTO_INCREMENT NOT NULL, recipe_id INT NOT NULL, author_id INT NOT NULL, content LONGTEXT NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_33FE1EF259D8A214 (recipe_id), INDEX IDX_33FE1EF2F675F31B (author_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE recipes_comments ADD CONSTRAINT FK_33FE1EF259D8A214 FOREIGN KEY (recipe_id) REFERENCES recipes (id)');
        $this->addSql('ALTER TABLE recipes_comments ADD CONSTRAINT FK_33FE1EF2F675F31B FOREIGN KEY (author_id) REFERENCES users (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE recipes_comments DROP FOREIGN KEY FK_33FE1EF259D8A214');
        $this->addSql('ALTER TABLE recipes_comments DROP FOREIGN KEY FK_33FE1EF2F675F31B');
        $this->addSql('DROP TABLE recipes_comments');
    }
}
