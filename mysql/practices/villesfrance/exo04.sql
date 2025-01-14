SELECT
	ville_nom,
	departement_nom
FROM
	villes_france_free,
	departement
WHERE
	ville_departement = departement_code
ORDER BY
	ville_population_2012 DESC
LIMIT
	10;
