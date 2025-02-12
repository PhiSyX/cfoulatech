DELIMITER $$

-- Récupérer utilisateurs de la ville donnée, et qui ont un âge plus grand que
-- l'âge donné.
CREATE OR REPLACE PROCEDURE getListUsersFromCity(
	in i_city varchar(40),
	in i_age tinyint
)
BEGIN

	SELECT *,TIMESTAMPDIFF(YEAR, date_of_birth, CURRENT_DATE) AS age
      FROM users
     WHERE city = i_city
       AND TIMESTAMPDIFF(YEAR, date_of_birth, CURRENT_DATE) > i_age;

END$$

DELIMITER ;

CALL getListUsersFromCity("Brussels", 18);
