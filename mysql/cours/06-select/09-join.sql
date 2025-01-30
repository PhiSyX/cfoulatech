-- LEFT  JOIN
SELECT
    CONCAT(u.firstname, " ", u.lastname) AS Auteurs,
    a.article_name
FROM users u
LEFT JOIN articles a
ON u.id_user = a.id_user_article;

-- RIGHT JOIN

SELECT
	CONCAT(u.firstname, " ", u.lastname) AS Auteurs,
	a.article_name
FROM users u
RIGHT JOIN articles a
ON u.id_user = a.id_user_article;

-- INNER JOIN
