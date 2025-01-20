SELECT
	ville_departement,
	departement_nom, -- ANY_VALUE(departement_nom) AS dép, -- En MySQL, il faut écrire ceci pour que ça fonctionne
	COUNT(*) AS nb_departement
FROM
	villes_france_free,
	departement
WHERE ville_departement = departement_code
GROUP BY ville_departement
ORDER BY nb_departement DESC
LIMIT 15;
