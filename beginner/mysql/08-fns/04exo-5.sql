-- Affichez-moi les utilisateurs qui ont entre 10 et 25 ans, et ordonnez-les du
-- plus vieux au plus jeune.
SELECT
	*,
	TIMESTAMPDIFF(YEAR, date_of_birth, CURRENT_DATE) AS age
FROM users
WHERE DATE_SUB(CURRENT_DATE, INTERVAL 26 YEAR) < date_of_birth
  AND DATE_SUB(CURRENT_DATE, INTERVAL 10 YEAR) > date_of_birth
ORDER BY date_of_birth ASC;
