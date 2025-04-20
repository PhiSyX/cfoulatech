-- Partie 2:

mysql -uroot -p

CREATE USER 'mike'@'localhost' IDENTIFIED BY 'cfitech';

CREATE USER 'chatGPT'@'localhost' IDENTIFIED BY 'nul';

ALTER USER 'mike'@'localhost' IDENTIFIED BY 'hello';

GRANT INSERT,DELETE ON bibliotheque.lecteurs TO 'mike'@'localhost';
GRANT INSERT,DELETE ON bibliotheque.livres TO 'mike'@'localhost';

GRANT UPDATE,SELECT ON bibliotheque.lecteurs TO 'chatGPT'@'localhost';

FLUSH PRIVILEGES;
exit;

mysql -umike -p
use bibliotheque;

INSERT INTO lecteurs (nom, prenom, email) VALUES
    ('Ronaldo', 'Cristiano', 'cr7@siuuuuuuuuu.pt'),
    ('Mathers', 'Marshall', 'eminem@d12.org');

SELECT * FROM lecteurs;
ERROR 1142 (42000): SELECT command denied to user 'mike'@'localhost' for table `bibliotheque`.`lecteurs`

INSERT INTO livres (titre,nom,prenom) VALUES (
	'On est ensemble',
	'Jean',
	'Aimable'
);

exit;

mysql -uroot -p

GRANT SELECT ON bibliotheque.* TO 'mike'@'localhost';
FLUSH PRIVILEGES;
exit;

mysql -uchatGPT -p
use bibliotheque;

UPDATE lecteurs SET nom = 'Tim', prenom = 'Protagoniste', email = 'abcd@ef.com' WHERE id = 1;

INSERT INTO livres (titre, nom, prenom) VALUES (
	"Copier-coller c'est la vie",
	'Dunia',
	'Julien'
);
ERROR 1142 (42000): INSERT command denied to user 'chatGPT'@'localhost' for table `bibliotheque`.`livres`

exit;

mysql -uroot -p

REVOKE ALL PRIVILEGES ON bibliotheque.lecteurs FROM 'chatGPT'@'localhost';
REVOKE INSERT,DELETE ON bibliotheque.livres FROM 'mike'@'localhost';
REVOKE INSERT,DELETE ON bibliotheque.lecteurs FROM 'mike'@'localhost';

SHOW GRANTS FOR 'mike'@'localhost';
+-------------------------------------------------------------------------------------------------------------+
| Grants for mike@localhost                                                                                   |
+-------------------------------------------------------------------------------------------------------------+
| GRANT USAGE ON *.* TO `mike`@`localhost` IDENTIFIED BY PASSWORD '*6B4F89A54E2D27ECD7E8DA05B4AB8FD9D1D8B119' |
| GRANT SELECT ON `bibliotheque`.* TO `mike`@`localhost`                                                      |
+-------------------------------------------------------------------------------------------------------------+

DROP USER 'chatGPT'@'localhost';

exit;
cd backupsDB
mysqldump -uroot bibliotheque > backup_v2.sql
