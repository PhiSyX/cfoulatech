SELECT
	a.article_name,
	u.firstname
FROM users2 u
INNER JOIN articles2 a ON u.id_user = a.id_user_article
WHERE u.id_user = 1;

SELECT
	a.article_name,
	CONCAT(u.firstname, " ", u.lastname) AS Auteurs
FROM users2 u
INNER JOIN articles2 a
ON u.id_user = a.id_user_article
WHERE u.id_user = 1;
