-- Sélectionner les femmes, les genres, les poids faisant plus de 50kg, et trier
-- les prénoms par ordre décroissant.
SELECT firstname,lastname,gender,weight_kg
FROM users
WHERE gender = 'F' 
AND weight_kg > 50
ORDER BY firstname DESC;
