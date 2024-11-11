-- Donner un alias au compteur.
SELECT
	COUNT(*) AS total_x
FROM users
WHERE gender = 'X';
