-- Récupérer le poids de la personne la plus légère de chaque catégorie de genre.
SELECT gender, MIN(weight_kg) as "Le poids de la personne la plus légère"
FROM users
GROUP BY gender;
