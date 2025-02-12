DELIMITER $$

CREATE OR REPLACE PROCEDURE getAllWomenWith60Weights()
BEGIN
	SELECT firstname,lastname
	FROM users
	WHERE gender = 'F'
	  AND weight_kg > 60;
END$$

DELIMITER ;

CALL getAllWomenWith60Weights();
