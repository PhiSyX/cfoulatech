-- 7) Affichez moi le nombre de fois qu'une année apparaît, et regroupé les par
-- année.
SELECT COUNT(*) AS total, YEAR(date_of_birth) as year_of_birth
FROM users
GROUP BY year_of_birth;
