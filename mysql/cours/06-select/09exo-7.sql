SELECT
	CONCAT(u.firstname, " ", u.lastname) AS Auteurs,
	a.article_name,
	LENGTH(a.article_name) AS le_nombre_de_lettres
FROM users u
INNER JOIN articles a
ON u.id_user = a.id_user_article
WHERE LENGTH(a.article_name) > 75
ORDER BY le_nombre_de_lettres;
