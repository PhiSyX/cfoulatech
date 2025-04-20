-- Partie 1:

CREATE DATABASE bibliotheque CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

CREATE TABLE `lecteurs`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nom` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `est_millionnaire` BOOLEAN NOT NULL
) ENGINE=InnoDB;

ALTER TABLE
    `lecteurs` ADD UNIQUE `lecteurs_email_unique`(`email`);

CREATE TABLE `livres`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `titre` VARCHAR(150) NOT NULL,
    `nom` TEXT NOT NULL,
    `firstname` VARCHAR(50) NOT NULL,
    `stock` FLOAT NOT NULL DEFAULT 1
) ENGINE=InnoDB;

CREATE TABLE `emprunts`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `id_lecteur` FLOAT NOT NULL,
    `id_livre` FLOAT NOT NULL,
    `date_emprunt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `date_retour` DATETIME NULL
) ENGINE=InnoDB;

mkdir backupsDB
cd backupsDB
mysqldump -uroot bibliotheque > backup_v1.sql

ALTER TABLE `lecteurs` ADD `prenom` VARCHAR(50) NOT NULL AFTER `nom`;

ALTER TABLE `livres` CHANGE `firstname` `prenom` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL;

ALTER TABLE `livres` CHANGE `nom` `nom` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL, CHANGE `stock` `stock` INT NOT NULL DEFAULT '1';

ALTER TABLE `emprunts` CHANGE `id_lecteur` `id_lecteur` INT NOT NULL, CHANGE `id_livre` `id_livre` INT NOT NULL;

ALTER TABLE `emprunts` ADD CONSTRAINT `emprunts_id_lecteur_foreign` FOREIGN KEY(`id_lecteur`) REFERENCES `lecteurs`(`id`);
ALTER TABLE `emprunts` ADD CONSTRAINT `emprunts_id_livre_foreign` FOREIGN KEY(`id_livre`) REFERENCES `livres`(`id`);

ALTER TABLE `lecteurs` DROP `est_millionnaire`;
