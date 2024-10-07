-- Sélectionner le poids de la personne la plus lourde qui est née après 2000 en
-- donnant comme titre : « le poids le plus élevé de la personne née après 2000 »
SELECT
    MAX(weight_kg) as "le poids le plus élevé de la personne née après 2000"
FROM users
WHERE date_of_birth >= "2001-01-01";
