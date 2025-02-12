DELIMITER $$

CREATE OR REPLACE PROCEDURE getTotalUsersFromBrussels(out o_total int)
BEGIN

	SELECT COUNT(*) INTO o_total
	  FROM users
	 WHERE city IN("Bruxelles", "Brussels");

END$$

DELIMITER ;
