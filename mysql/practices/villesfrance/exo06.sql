SELECT
	ANY_VALUE(departement_nom),
	ville_departement,
	SUM(ville_surface) AS total_surface
FROM
	villes_france_free,
	departement
WHERE
	ville_departement = departement_code
GROUP BY
	ville_departement
ORDER BY
	total_surface DESC
LIMIT
	10;
