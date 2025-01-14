SELECT
	nom_fr_fr
FROM
	pays
WHERE
	nom_fr_fr LIKE "p%"
ORDER BY
	LENGTH (nom_fr_fr);
