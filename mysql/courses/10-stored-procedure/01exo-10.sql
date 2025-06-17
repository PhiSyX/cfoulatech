DELIMITER $$

-- Exo 6
-- Récupérer tous les utilisateurs qui sont nés avant une certaine date, cette
-- date doit être donnée en paramètre.
CREATE OR REPLACE PROCEDURE getUsersBornBeforeDate(in i_date date)
BEGIN
	SELECT * FROM users WHERE date_of_birth < i_date;
END$$

DELIMITER ;

CALL getUsersBornBeforeDate('1991-12-07');
