-- Sélectionner le poids minimum des hommes et renommer le résultat par "Le
-- poids minimum des hommes".
SELECT MIN(weight_kg) AS "Le poids minimum des hommes" FROM users WHERE gender = 'M';
