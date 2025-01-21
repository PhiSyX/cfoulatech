-- 3)

SELECT firstname,lastname FROM users  WHERE gender = 'M'  UNION
SELECT firstname,lastname FROM users2 WHERE gender = 'M';
