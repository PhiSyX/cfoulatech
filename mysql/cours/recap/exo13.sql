-- Sélectionner tous les utilisateurs NE venant NI d'Anvers ni de Bruxelles et
-- les trier par le nom de leur ville.
SELECT *
FROM users
WHERE city NOT IN('Anvers', 'Bruxelles')
ORDER BY city ASC;
