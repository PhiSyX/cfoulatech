-- Sélectionner deux enregistrements à partir du cinquième enregistrement qui
-- sont nés avant Juin 2010 et les trier par leur nom de manière décroissante.
SELECT *
FROM users
WHERE date_of_birth < "2010-06-01"
ORDER BY lastname DESC
LIMIT 4, 2;
