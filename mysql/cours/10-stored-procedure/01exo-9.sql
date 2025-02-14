DELIMITER $$

-- Exo 5
-- Récupère tous les utilisateurs qui ont une lettre spécifique dans leur nom.
CREATE OR REPLACE PROCEDURE getUsersWhoHaveLetterInName(in i_letter char(1))
BEGIN

-- 1. Requête classique
-- SELECT * FROM users WHERE lastname LIKE CONCAT('%',i_letter,'%') AND i_letter NOT IN('%', '_', '');

-- 2. Ces lettres ne sont pas les bienvenues pour cette requête.
IF i_letter IN('%', '_', '') THEN
	RETURN;
END IF;

SELECT * FROM users WHERE lastname LIKE CONCAT('%',i_letter,'%');

END$$

DELIMITER ;

-- Les résultats DOIVENT être vides, parce que par défaut avec ces lettres,
-- ça nous renvoient tous les utilisateurs.
CALL getUsersWhoHaveLetterInName('');
CALL getUsersWhoHaveLetterInName('_');
CALL getUsersWhoHaveLetterInName('%');

-- Les résultats ne sont pas censé être vides
CALL getUsersWhoHaveLetterInName('z');
