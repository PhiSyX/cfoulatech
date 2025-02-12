DELIMITER $$

-- Récupérer tous les utilisateurs qui n'ont pas d'articles associés.
CREATE OR REPLACE PROCEDURE getListUsersWithoutArticles()
BEGIN

		   SELECT *
			 FROM users u
		LEFT JOIN articles a
               ON u.id_user = a.id_user_article
			WHERE a.id_user_article IS NULL;

END$$

DELIMITER ;

CALL getListUsersWithoutArticles();
