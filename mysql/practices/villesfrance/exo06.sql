SELECT
	departement_nom, -- ANY_VALUE(departement_nom), -- En MySQL, il faut écrire ceci pour que ça fonctionne
	ville_departement,
	SUM(ville_surface) AS total_surface
FROM
	villes_france_free,
	departement
WHERE ville_departement = departement_code
GROUP BY ville_departement
ORDER BY total_surface DESC
LIMIT 10;
