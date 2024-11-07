-- 4) Afficher moi les villes ainsi que les villes sans leurs 3 premières
--    lettres
SELECT 
    city, 
    SUBSTR(city, 4)
FROM users;
