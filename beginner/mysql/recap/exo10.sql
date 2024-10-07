-- Sélectionner les prénoms et date de naissances des personnes nés entre
-- février 1990 et mars 2020 et trier les du plus vieux au plus jeune.
SELECT firstname,date_of_birth
FROM users
WHERE date_of_birth >= '1990-02-01' AND date_of_birth <= '2020-03-31'
ORDER BY date_of_birth DESC;
