-- Révoquer les droits d'un utilisateur sur toutes les tables d'une base de
-- données.
--
-- REVOKE ALL PRIVILEGES ON <database>.* FROM '<user>'@'<host>';
REVOKE ALL PRIVILEGES ON coursmysql.* FROM 'mike'@'localhost';
