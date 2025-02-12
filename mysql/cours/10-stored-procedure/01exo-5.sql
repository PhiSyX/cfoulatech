DELIMITER $$

-- Récupérer les prénoms et noms des utilisateurs des villes :
--    Anvers, Bruxelles, New-York
CREATE OR REPLACE PROCEDURE getListUsersFromCities()
BEGIN
	SELECT firstname,lastname
	FROM users
	WHERE city IN("Anvers", "Brussels", "Bruxelles", "New York", "New-York");
END$$

DELIMITER ;

CALL getListUsersFromCities();
