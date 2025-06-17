-- USER: etudiant1

use coursmsyql;

UPDATE users SET lastname = "LaVie" WHERE id_user = (
	SELECT MAX(id_user) FROM users
);
