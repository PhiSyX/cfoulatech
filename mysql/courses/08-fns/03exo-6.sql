-- 6) Remplacez-moi dans les villes, "xelle" par "ssel". En gros traduire
--    Bruxelles en Anglais.
UPDATE users
SET city = REPLACE(city, 'xelle', 'ssel');
