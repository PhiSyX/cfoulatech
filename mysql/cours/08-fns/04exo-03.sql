-- Affichez-moi toutes les femmes et autres(X) qui ont moins de 36 ans, ordonné
-- du plus vieux au plus jeune.
SELECT
	*,
	TIMESTAMPDIFF (YEAR, date_of_birth, CURRENT_DATE) AS age
FROM users
WHERE gender IN('F', 'X')
  AND DATE_SUB (CURRENT_DATE, INTERVAL 36 YEAR) < date_of_birth
ORDER BY date_of_birth ASC;
