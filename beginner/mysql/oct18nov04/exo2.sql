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
