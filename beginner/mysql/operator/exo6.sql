-- Sélectionner tous les noms et prénoms des femmes ayant la lettre A dans leur
-- prénom par ordre croissant sur le prénom.
SELECT firstname,lastname
FROM users
WHERE gender = 'F'
AND firstname LIKE "%a%"
ORDER BY firstname ASC;
