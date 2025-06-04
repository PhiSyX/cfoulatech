<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250604092243 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Tous nos esports';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE esports (id INT AUTO_INCREMENT NOT NULL, nom_du_jeu VARCHAR(255) NOT NULL, type_de_jeu VARCHAR(255) NOT NULL, regle_du_jeu LONGTEXT NOT NULL, nb_joueur_equipe INT NOT NULL, date_de_sortie DATE NOT NULL COMMENT '(DC2Type:date_immutable)', pour_adulte TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            DROP TABLE esports
        SQL);
    }
}
