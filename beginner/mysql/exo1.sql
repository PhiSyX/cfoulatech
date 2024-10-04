-- Ajouter une colonne dans une table.
ALTER TABLE users ADD weight_kg INT(5) NOT NULL;

-- Modifier le poids de chaque utilisateurs. Le premier et le dernier DOIVENT
-- avoir le même poids.
UPDATE users SET weight_kg = 80  WHERE id_user = 1 OR id_user = 8;
UPDATE users SET weight_kg = 60  WHERE id_user = 2;
UPDATE users SET weight_kg = 64  WHERE id_user = 3;
UPDATE users SET weight_kg = 96  WHERE id_user = 4;
UPDATE users SET weight_kg = 71  WHERE id_user = 5;
UPDATE users SET weight_kg = 99  WHERE id_user = 6;
UPDATE users SET weight_kg = 120 WHERE id_user = 7;

-- Afficher le poids minimum des hommes.
SELECT MIN(weight_kg) AS "Le poids minimum des hommes" FROM users WHERE gender = 'M';

-- Afficher le poids maximum des femmes.
SELECT MAX(weight_kg) FROM users WHERE gender = 'F';
-- Afficher le poids des utilisateurs.
SELECT SUM(weight_kg) FROM users;

-- Afficher la moyenne des poids par utilisateurs
SELECT ROUND(AVG(weight_kg)) as "La moyenne des poids des utilisateurs" FROM users;

-- Afficher la moyenne des poids par genre
SELECT gender, ROUND(AVG(weight_kg)) as la_moyenne FROM users GROUP BY gender;
