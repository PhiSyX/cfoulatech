SELECT
	COUNT(*) AS "Nombre d'article publié par",
	CONCAT(u.firstname, " ", u.lastname) AS Auteurs
FROM users u
INNER JOIN articles a
ON u.id_user = a.id_user_article
GROUP BY u.id_user
ORDER BY COUNT(*) DESC;
