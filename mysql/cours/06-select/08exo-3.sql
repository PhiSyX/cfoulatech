-- 5)

(
    SELECT * FROM users UNION
    SELECT * FROM users2
) ORDER BY firstname ASC;
