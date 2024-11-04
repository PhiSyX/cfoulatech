-- Afficher la racine carrée des poids; le prénom et nom
SELECT
    SQRT(weight_kg),
    firstname,
    lastname
FROM users;
