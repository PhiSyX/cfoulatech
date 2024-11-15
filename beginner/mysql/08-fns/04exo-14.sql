-- 4) Affichez les hommes ou femmes qui sont né en Janvier ou Mars ou Mai ou
-- Juillet ou Octobre ou Décembre.
SELECT
	lastname,
	firstname
FROM users
WHERE gender IN ('F', 'M')
  AND MONTH(date_of_birth) IN(1, 3, 5, 7, 10, 12);
