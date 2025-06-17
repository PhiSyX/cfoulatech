-- Récupérer la moyenne des poids des personnes de la ville de Bruxelles.
SELECT
	AVG(weight_kg) as la_moyenne
FROM users
WHERE city = "Bruxelles";
