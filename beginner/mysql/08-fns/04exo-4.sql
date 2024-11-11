-- Affichez-moi les hommes qui ont plus de 18 ans, ordonné du plus jeune au plus
-- vieux.
SELECT
	*,
	TIMESTAMPDIFF (YEAR, date_of_birth, CURRENT_DATE) AS age
FROM users
WHERE gender = 'M'
  AND DATE_SUB(CURRENT_DATE, INTERVAL 19 YEAR) > date_of_birth
ORDER BY date_of_birth DESC;
