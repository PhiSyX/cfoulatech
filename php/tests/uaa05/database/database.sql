CREATE TABLE `stagiaires`(
							 `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
							 `nom` VARCHAR(100) NOT NULL,
							 `prenom` VARCHAR(100) NOT NULL,
							 `email` VARCHAR(100) NOT NULL,
							 `date_naissance` DATE NOT NULL,
							 `formation_id` INT NOT NULL
);
ALTER TABLE
	`stagiaires` ADD UNIQUE `stagiaires_email_unique`(`email`);
CREATE TABLE `formations`(
							 `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
							 `intitule` VARCHAR(100) NOT NULL,
							 `nb_mois` INT NOT NULL,
							 `date_debut` DATE NOT NULL
);
CREATE TABLE `users`(
						`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
						`username` VARCHAR(50) NOT NULL,
						`password` VARCHAR(255) NOT NULL
);
ALTER TABLE
	`stagiaires` ADD CONSTRAINT `stagiaires_formation_id_foreign` FOREIGN KEY(`formation_id`) REFERENCES `formations`(`id`);
