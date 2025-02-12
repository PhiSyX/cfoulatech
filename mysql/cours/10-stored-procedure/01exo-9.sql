DELIMITER $$

-- Récupère tous les utilisateurs qui ont une lettre spécifique dans leur nom.
CREATE OR REPLACE PROCEDURE getUsersWhoHaveLetterInName(in letter char(1))
BEGIN

	SELECT *
	  FROM users
	 WHERE letter NOT IN('%', '_', '')
	   AND lastname LIKE CONCAT('%',letter,'%');

END$$

DELIMITER ;

-- Les résultats sont vides
CALL getUsersWhoHaveLetterInName('');
CALL getUsersWhoHaveLetterInName('_');
CALL getUsersWhoHaveLetterInName('%');

-- Les résultats sont vides
CALL getUsersWhoHaveLetterInName('z');
