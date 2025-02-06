-- USER: root

CREATE USER 'mike'@'localhost' IDENTIFIED BY 'my-password';

GRANT SELECT ON coursmysql.* TO 'mike'@'localhost';
GRANT SELECT ON bdd_exercices.* TO 'mike'@'localhost';
GRANT SELECT ON sqlpays.* TO 'mike'@'localhost';
GRANT SELECT ON villesfrance.* TO 'mike'@'localhost';
-- GRANT SELECT ON *.* TO 'mike'@'localhost';
FLUSH PRIVILEGES;


-- USER: mike

SHOW DATABASES;
