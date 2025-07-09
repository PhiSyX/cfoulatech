<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250709140150 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Système de like';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_recipe_likes (recipe_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_DF15E66059D8A214 (recipe_id), INDEX IDX_DF15E660A76ED395 (user_id), PRIMARY KEY(recipe_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_recipe_likes ADD CONSTRAINT FK_DF15E66059D8A214 FOREIGN KEY (recipe_id) REFERENCES recipes (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE user_recipe_likes ADD CONSTRAINT FK_DF15E660A76ED395 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user_recipe_likes DROP FOREIGN KEY FK_DF15E66059D8A214');
        $this->addSql('ALTER TABLE user_recipe_likes DROP FOREIGN KEY FK_DF15E660A76ED395');
        $this->addSql('DROP TABLE user_recipe_likes');
    }
}
