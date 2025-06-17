-- Cette commande permet d'importer la base de données coursmysql à partir du
-- fichier coursmysql.sql, pour cela, il faut se connecter à la base de données
-- coursmysql en tant que root dans notre cas.
--
-- Analyse de la commande :
--
-- mysql      : commande permettant d'utiliser MySQL en ligne de commande
-- -uroot     : permet de se connecter en tant que root
-- -p         : permet de demander le mot de passe
-- coursmysql : nom de la base de données
-- <          : permet de rediriger l'entrée de la commande à partir du fichier coursmysql.sql

mysql -uroot -p coursmysql < coursmysql.sql
