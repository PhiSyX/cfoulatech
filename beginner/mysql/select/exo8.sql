-- Sélectionner tous les prénoms et noms des utilisateurs triés par le prénom de
-- manière croissante.
SELECT firstname,lastname
FROM users
ORDER BY firstname ASC;

-- Sélectionner les noms et date de naissances de trois utilisateurs triés par
-- les plus jeunes au plus vieux.
SELECT lastname,date_of_birth
FROM users
ORDER BY date_of_birth DESC
LIMIT 3;

-- Sélectionner les noms, les prénoms et les villes de quatres utilisateurs en
-- partant du second utilisateur triés par la ville de manière décroissante.
SELECT firstname,lastname,city
FROM users
ORDER BY city DESC
LIMIT 1,4;

-- Sélectionner les noms, et les genres de tous les utilisateurs et les trier
-- par leur genre de manière croissante et par leur nom de manière décroissante.
SELECT lastname,gender
FROM users
ORDER BY gender ASC,
         lastname DESC;
