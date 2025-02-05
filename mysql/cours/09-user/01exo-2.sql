-- USER: root

GRANT SELECT ON coursmysql.articles TO 'etudiant1'@'localhost';
GRANT SELECT ON coursmysql.users TO 'etudiant1'@'localhost';

FLUSH PRIVILEGES;
