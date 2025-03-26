--
-- 1) Créer la base de données `onestensemble`
--    Cette étape n'est pas nécéssaire dans AlwaysData
--
-- CREATE DATABASE onestensemble CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- 2) Créer les tables de la base de données `onestensemble`

CREATE TABLE users(
    id_user INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE messages(
    id_message INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    text TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL
);

ALTER TABLE
    messages ADD CONSTRAINT messages_user_id_foreign FOREIGN KEY(user_id) REFERENCES users(id_user);
