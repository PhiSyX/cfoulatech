-- Afficher la racine carrée des poids 2 chiffres après la virgule; le prénom et nom
SELECT
	TRUNCATE(SQRT(weight_kg), 2),
	firstname,
	lastname
FROM users;
