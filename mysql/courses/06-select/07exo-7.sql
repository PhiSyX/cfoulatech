-- 7) Afficher l'heure actuelle sous le format des états-unis en donnant comme
--    nom "heure au format américain".
SELECT DATE_FORMAT(CURRENT_TIME, GET_FORMAT(TIME, "USA")) AS "Heure au format Américain";
