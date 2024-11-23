-- Sélectionner tous les prénoms, noms et poids des utilisateurs ayant la lettre
-- E dans leur nom, ordonnées par leur poids, du plus lourd au moins lourd.
SELECT
	firstname,
	lastname,
	weight_kg
FROM users
WHERE lastname LIKE "%e%"
ORDER BY weight_kg DESC;
