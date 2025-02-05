-- Donner tous les droits à un utilisateur sur toutes les tables d'une base de
-- données.
--
-- GRANT ALL PRIVILEGES ON <database>.<table> TO '<user>'@'<host>'; GRANT ALL
-- PRIVILEGES ON <database>.* TO '<user>'@'<host>';
GRANT ALL PRIVILEGES ON coursmysql.* TO 'mike'@'localhost';
