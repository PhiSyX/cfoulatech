SELECT
	ville_departement,
	ANY_VALUE (departement_nom) AS dép,
	COUNT(*) AS enregistrements
FROM
	villes_france_free,
	departement
WHERE
	ville_departement = departement_code
GROUP BY
	ville_departement
ORDER BY
	enregistrements DESC;
