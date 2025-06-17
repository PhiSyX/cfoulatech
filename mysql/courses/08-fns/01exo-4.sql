-- Sélectionner le poids maximum des femmes.
SELECT
	MAX(weight_kg)
FROM users
WHERE gender = 'F';
