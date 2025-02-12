DELIMITER $$

-- Récupère tous les utilisateurs qui ont une lettre spécifique dans leur nom.
CREATE OR REPLACE PROCEDURE getUsersWhoHaveLetterInName(in i_letter char(1))
BEGIN

	SELECT *
	  FROM users
	 WHERE i_letter NOT IN('%', '_', '')
	   AND lastname LIKE CONCAT('%',i_letter,'%');

END$$

DELIMITER ;

-- Les résultats sont vides
CALL getUsersWhoHaveLetterInName('');
CALL getUsersWhoHaveLetterInName('_');
CALL getUsersWhoHaveLetterInName('%');

-- Les résultats sont vides
CALL getUsersWhoHaveLetterInName('z');
