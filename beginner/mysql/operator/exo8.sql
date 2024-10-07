-- Sélectionner tous les utilisateurs dont la dernière lettre des prénoms se
-- termine pas la lettre E.
SELECT * FROM users 
WHERE firstname LIKE "%e";
