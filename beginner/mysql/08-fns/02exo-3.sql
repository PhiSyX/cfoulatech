-- Afficher la racine carrée des poids arrondis; le prénom et nom
SELECT
	ROUND(SQRT(weight_kg)),
	firstname,
	lastname
FROM users;
