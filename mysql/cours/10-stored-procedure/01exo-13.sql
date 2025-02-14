DELIMITER $$

-- Exo 9
--
-- Récupérer le prénom, le nom et le poids du premier l'utilisateur.
CREATE OR REPLACE PROCEDURE getFirstUserDetail(out o_user varchar(255))
BEGIN
	SELECT CONCAT(firstname," ",lastname,", ",weight_kg,"Kg") INTO o_user FROM users LIMIT 1;
END$$

DELIMITER ;

CALL getFirstUserDetail(@user);
SELECT @user;
