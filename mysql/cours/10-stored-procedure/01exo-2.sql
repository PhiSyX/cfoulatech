DELIMITER $$

CREATE OR REPLACE PROCEDURE getListUsersByGender(IN i_gender VARCHAR(5))
BEGIN
	SELECT * FROM users WHERE gender = i_gender;
END$$

DELIMITER ;
