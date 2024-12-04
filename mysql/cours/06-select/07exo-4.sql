-- 4) Afficher les utilisateurs qui sont né entre juillet et novembre.
SELECT *
FROM users
WHERE MONTH(date_of_birth) BETWEEN 7 AND 11;
