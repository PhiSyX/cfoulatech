DELIMITER $$

CREATE OR REPLACE PROCEDURE getListUsersFromCities()
BEGIN
	SELECT firstname,lastname
	FROM users
	WHERE city IN("Anvers", "Brussels", "Bruxelles", "New York", "New-York");
END$$

DELIMITER ;

CALL getListUsersFromCities();
