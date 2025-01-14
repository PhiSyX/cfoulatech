SELECT
	ville_nom,
	COUNT(*) AS enregistrements
FROM
	villes_france_free
GROUP BY
	ville_nom
ORDER BY
	enregistrements DESC
