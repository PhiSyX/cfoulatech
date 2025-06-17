-- 4)

SELECT * FROM users  WHERE YEAR(date_of_birth) < 1990  UNION
SELECT * FROM users2 WHERE YEAR(date_of_birth) < 1990;
