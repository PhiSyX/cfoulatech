-- Sélectionner la moyenne des poids de tous les utilisateurs par genre,
-- renommer le champ du résultat de la moyenne par `la_moyenne`.
SELECT
    gender,
    ROUND(AVG(weight_kg)) as la_moyenne
FROM users
GROUP BY gender;
