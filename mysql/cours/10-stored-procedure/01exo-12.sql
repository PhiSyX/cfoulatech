DELIMITER $$

-- Exo 8
-- Récupérer en paramètre de sortie, le nombre total des utilisateurs venant
-- d'une ville donnée.
CREATE OR REPLACE PROCEDURE getUsersFromCity(in i_city varchar(40), out o_total int)
BEGIN
	SELECT COUNT(*) INTO o_total FROM users WHERE city = i_city;
END$$

DELIMITER ;

CALL getUsersFromCity('Brussels', @brusselers);
SELECT @brusselers;
