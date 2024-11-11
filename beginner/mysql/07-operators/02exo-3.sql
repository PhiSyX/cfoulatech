-- Sélectionner tous les noms et prénoms des hommes n'ayant dans leur prénom la
-- lettre A.
SELECT
	firstname,
	lastname
FROM users
WHERE gender = 'M'
  AND firstname NOT LIKE "%a%";
