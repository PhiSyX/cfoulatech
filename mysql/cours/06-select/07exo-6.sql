-- 6) Afficher les utilisateurs qui ont un ID entre 2 et 9 trié par ordre
--    décroissant sur le poids.
SELECT *
FROM users
WHERE (
	id_user BETWEEN 2 AND 9
)
ORDER BY weight_kg DESC;
