-- Sélectionner les noms, et les genres de tous les utilisateurs et les trier
-- par leur genre de manière croissante et par leur nom de manière décroissante.
SELECT
	lastname,
	gender
FROM users
ORDER BY
	gender ASC,
	lastname DESC;
