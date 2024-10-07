-- Sélectionner tous les hommes, les genres, les villes où les villes
-- contiennent la lettre A, et les trier par leur nom.
SELECT firstname,lastname,gender,city FROM users
WHERE gender = 'M' 
AND city LIKE "%a%"
ORDER BY lastname ASC;
