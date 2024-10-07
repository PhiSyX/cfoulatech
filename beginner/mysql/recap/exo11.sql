-- Sélectionner 3 utilisateurs à partir de 5ème qui ont un E ou un A dans leurs
-- prénoms et les trier par genre.
SELECT *
FROM users
WHERE firstname LIKE "%a%"
OR firstname LIKE "%e%"
ORDER BY gender ASC
LIMIT 4,3;