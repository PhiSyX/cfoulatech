SELECT
	nom_fr_fr,
	LENGTH(nom_fr_fr) AS nb_lettres
FROM
	pays
WHERE
	LENGTH(nom_fr_fr) BETWEEN 10 AND 12
ORDER BY
	nom_fr_fr DESC;
