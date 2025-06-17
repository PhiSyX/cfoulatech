CREATE TABLE users (
	firstname VARCHAR(255) COLLATE utf8mb4_general_ci NOT NULL,
	lastname VARCHAR(255) COLLATE utf8mb4_general_ci NOT NULL,
	gender ENUM ('M', 'F', 'X') COLLATE utf8mb4_general_ci NOT NULL,
	date_of_birth DATE NOT NULL
) ENGINE = InnoDB;

DROP TABLE users;
