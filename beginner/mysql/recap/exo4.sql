-- Sélectionner le nombre de personnes qui sont nées avant 2000, regroupées par
-- leur genre.
--
-- En donnant comme titre à ce nombre : « Le nombre des personnes nées avant 2000 ».
SELECT
    gender,
    COUNT(*) as "Le nombre des personnes nées avant 2000"
FROM users
WHERE date_of_birth < "2000-01-01"
GROUP BY gender;
