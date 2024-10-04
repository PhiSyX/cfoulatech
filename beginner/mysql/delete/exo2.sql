-- Supprime plusieurs lignes dans une table avec deux conditions en fonction de 
-- plusieurs champs (OU) 
DELETE FROM `users` 
       WHERE firstname = "Lara" 
       OR    lastname  = "Bond";
