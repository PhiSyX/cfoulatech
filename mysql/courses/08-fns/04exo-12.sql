-- 2) Affichez les personnes qui sont né entre février et Septembre.

SELECT *
FROM users
WHERE MONTH(date_of_birth) BETWEEN 2 AND 9;
