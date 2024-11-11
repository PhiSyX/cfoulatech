-- 2) Affichez les 5 premiers utilisateurs ainsi que le nombre de lettre dans leurs
-- prénoms. En ajoutant comme nom de colonne « Le nombre de lettres dans le
-- prénom ». Trier par ordre décroissant sur le nombre de lettre du prénom.
SELECT
	*,
	LENGTH(firstname) AS le_nombre_de_lettres_dans_le_prénom
FROM users
ORDER BY le_nombre_de_lettres_dans_le_prénom DESC
LIMIT 5;
