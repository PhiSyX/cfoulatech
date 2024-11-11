-- Sélectionner les utilisateurs dont leur ville est soit Bruxelles soit Anvers,
-- soit New-York, soit Houston et qui sont nés avant décembre 1990, du plus lour
-- au moins lourd.
SELECT
	*
FROM users
WHERE city IN (
		'Anvers',
		'Bruxelles',
		'Houston',
		'New-York'
	  )
  AND date_of_birth < '1990-12-01'
ORDER BY
	weight_kg DESC;
