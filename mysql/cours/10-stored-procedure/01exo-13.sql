DELIMITER $$

-- Retourner le prénom, nom et poids, dans une variable de sortie.
CREATE OR REPLACE PROCEDURE getUsers(out user varchar(255))
BEGIN

	 SELECT CONCAT(firstname,' ',lastname,', ',weight_kg,'Kg') INTO user
	   FROM users
	  LIMIT 1;

END$$

DELIMITER ;

CALL getUsers(@user);
SELECT @user;
