-- 6)

(
    SELECT firstname,lastname FROM users  WHERE gender = 'F' UNION
    SELECT firstname,lastname FROM users2 WHERE gender = 'F'
) ORDER BY firstname DESC LIMIT 5;
