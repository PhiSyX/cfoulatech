-- Sélectionner les quatres derniers utilisateurs. Ici je me base à partir de
-- l'ID utilisateur (comme elle est en auto-incrémente, çe n'est pas un souci.)
SELECT *
FROM users
ORDER BY id_user DESC
LIMIT 4;
