-- 5) Afficher moi les villes ainsi que les villes que de la 4ème lettre à la
--    7ème
SELECT
	city,
	SUBSTR (city, 4, 4)
FROM users;
