-- Récupérer la somme des poids de tous les utilisateurs NE venant PAS de
-- Bruxelles en donnant le nom « La somme des poids de tous les utilisateurs en
-- dehors de Bruxelles ».

SELECT
    SUM(weight_kg) as "La somme des poids de tous les utilisateurs en dehors de Bruxelles"
FROM users
WHERE city != "Bruxelles";
