-- 3) Affichez les femmes ou autres (X) qui sont né entre Ie 12 eme et Ie 26e
-- me jour.
SELECT
	lastname,
	firstname
FROM users
WHERE gender IN ('F', 'X')
  AND DAY(date_of_birth) BETWEEN 12 AND 26;
