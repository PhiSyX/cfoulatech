-- Ajoutez 365 jours à toutes les femmes et hommes venant d’une ville contenant
-- « e ».
UPDATE users
SET date_of_birth = DATE_ADD(date_of_birth, INTERVAL 365 DAY)
WHERE gender IN('F', 'M')
  AND city LIKE "%e%";
