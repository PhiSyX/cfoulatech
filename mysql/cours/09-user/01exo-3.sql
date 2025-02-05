-- USER: etudiant1

SELECT u.firstname,u.lastname FROM users u
INNER JOIN articles a
ON u.id_user = a.id_user_article
WHERE u.gender = 'M';
