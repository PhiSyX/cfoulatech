-- 3) Afficher la date que nous sommes aujourd'hui sous le format européen.
SELECT DATE_FORMAT(CURRENT_DATE, GET_FORMAT(DATE, "EUR")) AS "Date d'aujourd'hui";
