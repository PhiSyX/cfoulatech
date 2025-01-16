SELECT
	ville_departement,
	departement_nom, -- ANY_VALUE(departement_nom) AS dép, -- En MySQL, il faut écrire ceci pour que ça fonctionne
	COUNT(*) AS enregistrements
FROM
	villes_france_free,
	departement
WHERE ville_departement = departement_code
GROUP BY ville_departement
ORDER BY enregistrements DESC;
