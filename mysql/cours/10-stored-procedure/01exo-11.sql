DELIMITER $$

-- Récupérer tous les utilisateurs d'une ville donnée.
CREATE OR REPLACE PROCEDURE getUsersFromCity(in i_city varchar(40))
BEGIN

	SELECT *
	  FROM users
	 WHERE city = i_city;

END$$

DELIMITER ;

CALL getUsersFromCity('Brussels');
