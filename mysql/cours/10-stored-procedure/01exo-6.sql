DELIMITER $$

-- Récupérer toutes les femmes (FL), qui ont un poids supérieur à 60Kg.
CREATE OR REPLACE PROCEDURE getAllWomenAbove60WeightKG()
BEGIN
	SELECT firstname,lastname
	  FROM users
	 WHERE gender = 'F'
	   AND weight_kg > 60;
END$$

DELIMITER ;

CALL getAllWomenAbove60WeightKG();
