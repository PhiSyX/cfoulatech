--------------
-- Partie 4 --
--------------

mariadb -umike -p
use bibliotheque

-- 1)
SELECT CONCAT(nom, ' ', prenom) AS lecteur FROM lecteurs WHERE nom LIKE '%a%' ORDER BY nom ASC;

-- 2)
SELECT * FROM livres WHERE stock >= 3;

-- 3)
SELECT * FROM lecteurs LIMIT 1,3;

-- 4)
SELECT COUNT(*) AS "le nombre d'emprunt" FROM emprunts;

-- 5)
SELECT * FROM emprunts WHERE DATE_SUB(CURRENT_DATE, INTERVAL 3 MONTH) > date_retour;

-- 6)
SELECT l.* FROM lecteurs l LEFT JOIN emprunts e ON l.id = e.id_lecteur WHERE e.id_lecteur is NULL;

-- 7)
SELECT li.titre, CONCAT(li.nom, ' ', li.prenom) AS auteur, CONCAT(le.nom, ' ', le.prenom) AS lecteur FROM livres li LEFT JOIN emprunts e ON e.id_livre = li.id LEFT JOIN lecteurs le ON e.id_lecteur = le.id;

-- 8)
SELECT
	li.titre,
	CONCAT(li.nom, ' ', li.prenom) AS auteur,
	CONCAT(le.nom, ' ', le.prenom) AS lecteur,
	e.date_emprunt
FROM emprunts e
INNER JOIN livres li ON e.id_livre = li.id
INNER JOIN lecteurs le ON e.id_lecteur = le.id;

-- 9)
SELECT CONCAT(le.nom, ' ', le.prenom) AS lecteur
FROM emprunts e
INNER JOIN livres li ON e.id_livre = li.id
INNER JOIN lecteurs le ON e.id_lecteur = le.id;
