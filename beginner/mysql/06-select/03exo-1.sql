-- Afficher les noms et prénoms de tous les utilisateurs par ordre alphabétique
-- en fonction de leurs prénoms.
SELECT
	lastname,
	firstname
FROM users
ORDER BY firstname ASC;
