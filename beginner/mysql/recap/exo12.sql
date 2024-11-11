-- Récupérer la moyenne des poids des personnes d'Anvers et de Bruxelles avec le
-- tire « La moyenne des poids »
SELECT
	city,
	AVG(weight_kg) as "La moyenne des poids"
FROM users
WHERE city IN ('Anvers', 'Bruxelles')
GROUP BY city;
