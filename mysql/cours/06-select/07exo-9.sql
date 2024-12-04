-- 9) Affiche le nombre de personne qui sont né regroupé par leur année et mois
--    de naissance trié par ordre décroissant sur les années de naissance.
SELECT
	COUNT(date_of_birth) AS "Le nombre de personne né",
	YEAR(date_of_birth) AS année,
	MONTH(date_of_birth) AS au_mois_de
FROM users
GROUP BY au_mois_de, année
ORDER BY au_mois_de DESC, année ASC;
