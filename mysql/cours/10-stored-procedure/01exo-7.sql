DELIMITER $$

-- Exo 3
-- Récupérer tous les utilisateurs qui ont moins de 30 ans
CREATE OR REPLACE PROCEDURE getListUsersUnder30Years()
BEGIN

		SELECT *, TIMESTAMPDIFF(YEAR, date_of_birth, CURRENT_DATE) AS age
		FROM users
		WHERE DATE_SUB(CURRENT_DATE, INTERVAL 31 YEAR) < date_of_birth;

END$$

DELIMITER ;

CALL getListUsersUnder30Years();
