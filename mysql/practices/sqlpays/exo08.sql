SELECT
	COUNT(*) AS nb_pays,
	LENGTH(nom_fr_fr) AS par_nb_lettres
FROM
	pays
GROUP BY
	par_nb_lettres
ORDER BY
	par_nb_lettres
LIMIT
	10;
