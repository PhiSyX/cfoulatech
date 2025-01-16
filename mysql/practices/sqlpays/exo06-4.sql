SELECT nom_fr_fr
FROM pays
WHERE
	nom_fr_fr NOT LIKE "%a%" AND
	nom_fr_fr NOT LIKE "%e%"
;
