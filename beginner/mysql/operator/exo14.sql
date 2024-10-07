-- Sélectionner les 3 premiers utilisateurs dont les prénoms contiennent la
-- lettre C ou que les noms contiennent un E, et les trier par leur nom.
SELECT * FROM users
WHERE firstname LIKE "%c%"
OR lastname LIKE "%e%"
ORDER BY lastname ASC
LIMIT 3;
