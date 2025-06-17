SELECT
	CONCAT(u.firstname, " ", u.lastname) AS Auteurs,
	u.date_of_birth,
	a.article_name
FROM users u
INNER JOIN articles a
ON u.id_user = a.id_user_article
WHERE u.date_of_birth > SUBDATE(CURRENT_DATE, INTERVAL 25 YEAR);
