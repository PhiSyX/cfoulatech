-- 1) Créer une base de données « mediamarkt » utf8 en generale_ci.
CREATE DATABASE `mediamarkt` CHARACTER SET utf8 COLLATE utf8_general_ci;

-- 2) Créer dans cette base de données mediamarkt 3 tables, voir pdf.
CREATE TABLE `utilisateurs` ( 
  `nom`               VARCHAR(100)  NOT NULL,
  `prenom`            VARCHAR(100)  NOT NULL,
  `age`               INT(11)       NOT NULL,
  `date_de_naissance` DATE          NOT NULL,
  `adresse`           VARCHAR(250)  NOT NULL,
  `email`             VARCHAR(140)  NOT NULL
) 
ENGINE = InnoDB;

CREATE TABLE `tvs` ( 
  `nom`    VARCHAR(150) NOT NULL,
  `marque` VARCHAR(50)  NOT NULL,
  `taille` DECIMAL(20)  NOT NULL
)
ENGINE = InnoDB;

CREATE TABLE `smartphones` ( 
  `nom`     VARCHAR(150) NOT NULL,
  `marque`  VARCHAR(50)  NOT NULL,
  `couleur` VARCHAR(20)  NOT NULL
)
ENGINE = InnoDB;

-- 3) Modifier le champ couleur en un champ de type date dont le nom est « date_de_sortie »
ALTER TABLE `smartphones` CHANGE COLUMN `couleur` `date_de_sortie` DATE NOT NULL;

-- 4) Rajouter pour ces 3 tables un champ id_<nomdelatable> qui sera la clé
--    primaire en première position.
ALTER TABLE `utilisateurs` ADD COLUMN `id_utilisateur` INT AUTO_INCREMENT PRIMARY KEY FIRST;
ALTER TABLE `tvs` ADD COLUMN `id_tv` INT AUTO_INCREMENT PRIMARY KEY FIRST;
ALTER TABLE `smartphones` ADD COLUMN `id_smartphone` INT AUTO_INCREMENT PRIMARY KEY FIRST;

-- 5) Rajouter 3 enregistrements différents et cohérents par table.
INSERT INTO utilisateurs
    (nom, prenom, age, date_de_naissance, adresse, email)
VALUES
    ('Ronaldo', 'Cristiano', 39, '1985-02-05', 'Boulevard des penalties 7', 'cr7@siuuuuuuuuu.pt'),
    ('Makkonen Tesfaye', 'Abel', 37, '1990-02-16', 'Rue des Lumières aveuglantes 424', 'le@week.end'),
    ('Mathers', 'Marshall', 52, '1972-10-17', "Avenue de l'oiseau moqueur 357", 'eminem@d12.org')
;

INSERT INTO tvs
    (nom, marque, taille)
VALUES
    ('OLED 4K Smart TV 83S90D', 'SAMSUNG', 209),
    ('LG OLED TV OLED77M39LA', 'LG', 195),
    ('BRAVIA 8 - 4K OLED', 'SONY', 195)
;

INSERT INTO smartphones
    (nom, marque, date_de_sortie)
VALUES
    ('iPhone 16 Pro Max', 'APPLE', '2024-09-20'),
    ('Galaxy Z Fold6', 'SAMSUNG', '2024-10-21'),
    ('Pixel 9 Pro Fold', 'GOOGLE', '2024-09-04')
;
