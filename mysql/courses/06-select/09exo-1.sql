-- Mauvaise pratique, parce qu'il peut y avoir un conflit sur les noms des champs
SELECT
	article_name,
	firstname
FROM users2
INNER JOIN articles2
ON id_user = id_user_article;

-- Meilleur pratique,
SELECT
	articles2.article_name,
	users2.firstname
FROM users2
INNER JOIN articles2
ON users2.id_user = articles2.id_user_article;

-- Meilleur pratique, avec alias
SELECT
	a.article_name,
	u.firstname
FROM users2 u
INNER JOIN articles2 a
ON u.id_user = a.id_user_article;
