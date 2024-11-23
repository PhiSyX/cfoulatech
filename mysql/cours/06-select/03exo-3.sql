-- Afficher les noms, prénoms et villes du 2ème au 5ème utilisateurs ordonné par
-- leur ville, par ordre décroissant.
SELECT
	firstname,
	lastname,
	city
FROM users
ORDER BY city DESC
LIMIT 1, 4;
