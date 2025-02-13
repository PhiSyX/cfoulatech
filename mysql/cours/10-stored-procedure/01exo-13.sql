DELIMITER $$

CREATE OR REPLACE PROCEDURE getFirstUser(out user varchar(255))
BEGIN

	SELECT CONCAT(firstname,' ',lastname,", ",weight_kg,"Kg") INTO user
	  FROM users
	  LIMIT 1;

END$$

DELIMITER ;

CALL getFirstUser(@user);
SELECT @user;
