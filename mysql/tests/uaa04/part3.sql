--------------
-- Partie 3 --
--------------

INSERT INTO lecteurs (nom,prenom,email) VALUES ('Dunia', 'Julien', 'jdunia@cfitech.be');
INSERT INTO livres (nom,prenom,titre) VALUES ('Stephen', 'King', 'The Shining');
INSERT INTO lecteurs (nom,prenom,email) VALUES ('Doré', 'Julien', 'juliend@cfitech.be');
INSERT INTO livres (nom,prenom,titre,stock) VALUES ('Tolkien', 'JRR', 'The Lord of the Rings', 10);

INSERT INTO lecteurs (nom,prenom,email) VALUES ('Dunia', 'Julia', 'jdunia@cfitech.be');
	MySQL a répondu :

	#1062 - Duplicata du champ 'jdunia@cfitech.be' pour la clef 'lecteurs_email_unique'

	Car nous avons définis le champ `email` comme étant un champ dont les valeurs doivent être UNIQUE.

INSERT INTO livres (nom,prenom,titre) VALUES ('Stephen', 'King', 'The Shining');
INSERT INTO livres (nom,prenom,titre,stock) VALUES ('Rowling', 'JK', 'Harry Potter', 6);
INSERT INTO lecteurs (nom,prenom,email) VALUES ('S.', 'Mike', 's@mike.it');

INSERT INTO emprunts (id_lecteur,id_livre,date_emprunt,date_retour) VALUES
	(6, 5, '2024-11-18 10:26:12', NULL),
	(3, 1, '2025-02-15 10:26:12', '2025-03-28 10:26:12');

INSERT INTO lecteurs (nom,prenom,email) VALUES
	('Makkonen Tesfaye', 'Abel', 'le@week.end'),
	('Jean', 'Neymar', 'jean@neymar.br');

INSERT INTO livres (nom,prenom,titre,stock) VALUES
	('Austen', 'Jane', 'Orgueil et préjugés', 1000),
	('Camus', 'Albert', "L'Étranger", 2000),
	('Shakespeare', 'William', 'Hamlet', 3000)
;

INSERT INTO emprunts (id_lecteur, id_livre, date_emprunt, date_retour) VALUES
	(3, 5, current_timestamp(), NULL),
	(7, 7, current_timestamp(), '2023-07-18 10:26:12'),
	(8, 8, current_timestamp(), NULL),
	(7, 2, current_timestamp(), '2023-07-18 10:26:12'),
	(3, 1, current_timestamp(), NULL);
