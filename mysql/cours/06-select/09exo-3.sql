SELECT
	CONCAT(u.firstname, ' ', u.lastname) AS Auteurs,
	a.article_name
FROM users u
INNER JOIN articles a
ON u.id_user = a.id_user_article;
