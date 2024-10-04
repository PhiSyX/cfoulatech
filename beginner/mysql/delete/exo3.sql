-- Supprime plusieurs lignes dans une table avec une condition en limitant le 
-- le nombre de suppression
DELETE FROM `users` 
       WHERE firstname = "Lara" 
       AND
       LIMIT = 4;
