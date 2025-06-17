-- Sélectionner les noms et date de naissances de trois utilisateurs triés par
-- les plus jeunes au plus vieux.
SELECT
	lastname,
	date_of_birth
FROM users
ORDER BY date_of_birth DESC
LIMIT 3;
