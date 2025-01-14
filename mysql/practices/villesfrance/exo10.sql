SELECT
	ville_departement,
	SUM(ville_population_2012) AS habitants
FROM
	villes_france_free
GROUP BY
	ville_departement
HAVING
	habitants > 2000000
ORDER BY
	habitants DESC;
