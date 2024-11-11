-- Sélectionner tous les prénoms et noms, où les noms commence par la lettre B
-- par ordre décroissant sur les noms.
SELECT
	firstname,
	lastname
FROM users
WHERE lastname LIKE "B%"
ORDER BY lastname DESC;
