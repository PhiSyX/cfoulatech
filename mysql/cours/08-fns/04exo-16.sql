-- 6) Essayez de m'afficher le nombre de fois qu'un mois apparaît dans les dates
-- de naissances, regroupé lar les mois.
SELECT COUNT(*) AS total, MONTH(date_of_birth) as month_of_birth
FROM users
GROUP BY month_of_birth;
