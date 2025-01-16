SELECT
	ville_nom,
	ville_surface
FROM villes_france_free
WHERE
	ville_surface > (
		SELECT AVG(ville_surface) FROM villes_france_free
	)
;
