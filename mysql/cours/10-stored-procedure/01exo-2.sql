DELIMITER $$

CREATE OR REPLACE PROCEDURE getListUsersByGender(in i_gender varchar(5))
BEGIN

	SELECT * FROM users WHERE gender = i_gender;

END$$

DELIMITER ;
