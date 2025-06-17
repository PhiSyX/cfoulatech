DELIMITER $$

-- Exo 11
--
-- Bonus
CREATE OR REPLACE PROCEDURE checkIfUsersHasAge(
	in i_age tinyint,
	out o_is_ok varchar(3)
)
BEGIN
	SELECT
		CASE WHEN COUNT(*) > 0 THEN 'Oui' ELSE 'Non' END INTO o_is_ok
	FROM users
	WHERE TIMESTAMPDIFF(YEAR, date_of_birth, CURRENT_DATE) = i_age;
END$$

DELIMITER ;

CALL checkIfUsersHasAge(33, @checked);
SELECT @checked;
