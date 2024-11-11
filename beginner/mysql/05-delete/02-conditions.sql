-- Supprime plusieurs lignes dans une table avec une condition en fonction d'un
-- champ.
DELETE FROM users
WHERE firstname = "Lara";

-- Supprime plusieurs lignes dans une table avec deux conditions en fonction de
-- plusieurs champs (OU)
DELETE FROM users
WHERE firstname = "Lara"
   OR lastname = "Bond";
