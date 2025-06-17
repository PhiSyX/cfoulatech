-- 5) Afficher la date et l'heure que nous sommes aujourd'hui dans le format
--    européen avec comme tire "Heure Actelle".
SELECT DATE_FORMAT(CURRENT_TIME, GET_FORMAT(DATETIME, "EUR")) AS "Heure Actuelle";
