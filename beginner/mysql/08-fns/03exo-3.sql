-- 3) Affichez-moi les noms en majuscule et les prénoms en minuscule de tous les
-- utilisateurs ayant un « a » dans leur nom ou prénom
SELECT
	UPPER(lastname),
	LOWER(firstname)
FROM users
WHERE lastname LIKE '%a%'
   OR firstname LIKE '%a%';
