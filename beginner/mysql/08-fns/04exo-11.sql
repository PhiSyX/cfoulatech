-- 1) Affichez-moi toutes les personnes nées entre 1990 et 2000 inclus.

SELECT *
FROM users
WHERE YEAR(date_of_birth) BETWEEN 1990 AND 2000;
