-- 3) Affichez les femmes ou autres (X) qui sont né entre le 12ème et le 26eme
--    jour.
SELECT
	lastname,
	firstname
FROM users
WHERE gender IN ('F', 'X')
  AND DAY(date_of_birth) BETWEEN 12 AND 26;
