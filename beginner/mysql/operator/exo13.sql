-- Sélectionner les prénoms, noms des hommes et des femmes faisant plus de 90kg,
-- ou les prénoms commencent par la lettre B,
-- ou que les utilisateurs soient nés après janvier 1990.
-- Et les trier par la date de naissance du plus jeunes au plus vieux.
SELECT firstname,lastname,date_of_birth,gender,weight_kg
FROM users
WHERE gender != 'X'
AND weight_kg > 90 
OR firstname LIKE "b%"
AND date_of_birth >= "1990-02-01"
ORDER BY date_of_birth DESC;
