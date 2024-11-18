-- 5) Affichez tous les utilisateurs qui sont né un jour pair. (Par exemple le 2
--    novembre, le 8 janvier, le 28 décembre etc.).
SELECT *
FROM users
WHERE DAY(date_of_birth) MOD 2 = 0;
