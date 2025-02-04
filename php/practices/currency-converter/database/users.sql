CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  email varchar(140) COLLATE utf8mb4_general_ci NOT NULL,
  password varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY username (username),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
