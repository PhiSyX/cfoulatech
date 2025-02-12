DELIMITER $$

CREATE OR REPLACE PROCEDURE getUsersWhoHaveLetterInName(IN letter CHAR(1))
BEGIN
	SELECT *
	FROM users
	WHERE letter NOT IN('%', '_', '')
	  AND lastname LIKE CONCAT('%',letter,'%');
END$$

DELIMITER ;

-- Empty results
CALL getUsersWhoHaveLetterInName('');
CALL getUsersWhoHaveLetterInName('_');
CALL getUsersWhoHaveLetterInName('%');

-- With results
CALL getUsersWhoHaveLetterInName('z');
