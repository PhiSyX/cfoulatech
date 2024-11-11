-- 7) Traduisez de manière inverse London en Londres en remplaçant seulement les
--    lettres nécessaire... Attention à ne pas modifier d'autres villes, il faut
--    une condition
UPDATE users
SET city = REPLACE (city, 'don', 'dres')
WHERE city = 'London'
