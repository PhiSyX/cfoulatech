DELIMITER $$

CREATE OR REPLACE PROCEDURE getTotalUsersFromBrussels(OUT o_total INT)
BEGIN

	SELECT
		COUNT(*) INTO o_total
	FROM users
	WHERE
		city IN("Bruxelles", "Brussels");

END$$

DELIMITER ;
