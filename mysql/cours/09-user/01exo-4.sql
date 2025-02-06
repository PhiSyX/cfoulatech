-- USER: root

REVOKE SELECT ON coursmysql.articles FROM 'etudiant1'@'localhost';
FLUSH PRIVILEGES;
