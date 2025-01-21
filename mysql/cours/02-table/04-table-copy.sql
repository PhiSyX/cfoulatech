-- Récupérer la requête SQL de la création d'une table avec tous les champs.
-- Copier la requête et remplacer le nom de la table par la nouvelle, et
-- executer. La requête peut fournir les auto incrémentations sur les ID si
-- elles sont présentes. Il faut retirer l'instruction `AUTO_INCREMENT=X`.
SHOW CREATE TABLE users;

-- Sinon :
-- Copie une table (users) vers une autre (users2) sans les données.
CREATE TABLE users2 LIKE users;
