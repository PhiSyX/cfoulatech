DELIMITER $$

-- Vérifier si au moins une personne avec l'âge donnée.
CREATE OR REPLACE PROCEDURE checkIfUsersHasAge(in i_age tinyint)
BEGIN

	SELECT *
      FROM users
	 WHERE TIMESTAMPDIFF(YEAR, date_of_birth, CURRENT_DATE) = i_age;

END$$

DELIMITER ;

CALL checkIfUsersHasAge(33);
