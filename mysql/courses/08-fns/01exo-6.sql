-- Sélectionner la moyenne des poids par utilisateur et renommer le champ du
-- résultat par "La moyenne des poids des utilisateurs".
SELECT
	ROUND(AVG(weight_kg)) as "La moyenne des poids des utilisateurs"
FROM users;
