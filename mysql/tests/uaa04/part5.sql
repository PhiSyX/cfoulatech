--------------
-- Partie 5 --
--------------

mysql -uroot

-- a)
DELIMITER $$
CREATE PROCEDURE AfficherLecteurs246()
BEGIN
	SELECT * FROM lecteurs WHERE id IN(2, 4, 6);
END$$
DELIMITER ;
CALL AfficherLecteurs246();

-- b)
DELIMITER $$
CREATE PROCEDURE AfficherTroisDerniersLivres()
BEGIN
	SELECT * FROM livres ORDER BY id DESC LIMIT 3;
END$$
DELIMITER ;
CALL AfficherTroisDerniersLivres();

-- c)
DELIMITER $$
CREATE PROCEDURE AjouterLecteur(in i_nom varchar(50), in i_prenom varchar(50), in i_email varchar(100))
BEGIN
INSERT INTO lecteurs (nom,prenom,email) VALUES (i_nom, i_prenom, i_email);
END$$
DELIMITER ;
CALL AjouterLecteur('Doe', 'John', 'john@doe.com');

-- d)
DELIMITER $$
CREATE PROCEDURE AfficherLivresEmprunteAPartirDe(in i_date timestamp)
BEGIN
	SELECT * FROM livres li INNER JOIN emprunts e ON e.id_livre = li.id WHERE date_emprunt > i_date;
END$$
DELIMITER ;
CALL AfficherLivresEmprunteAPartirDe("2025-03-28 10:30:00");

-- e)
DELIMITER $$
CREATE PROCEDURE AfficherNombreEmprunts(out o_nb_emprunt int)
BEGIN
	SELECT COUNT(*) INTO o_nb_emprunt FROM emprunts WHERE date_retour is NULL;
END$$
DELIMITER ;

CALL AfficherNombreEmprunts(@emprunt);
SELECT @emprunt;

-- f
DELIMITER $$
CREATE PROCEDURE AfficherNombreStockLivre(in i_stock int, out o_nb_livre int)
BEGIN
	SELECT COUNT(*) INTO o_nb_livre FROM livres WHERE stock = i_stock;
END$$
DELIMITER ;

CALL AfficherNombreStockLivre(1, @nb_livre);
SELECT @nb_livre;

-- g
DELIMITER $$
CREATE PROCEDURE AfficherLecteurParSonPrenom(in i_prenom varchar(50), out o_id int)
BEGIN
	SELECT id INTO o_id FROM lecteurs WHERE prenom = i_prenom LIMIT 1;
END$$
DELIMITER ;

CALL AfficherLecteurParSonPrenom("Mike", @id);
SELECT @id;

-- h
SELECT * FROM lecteurs WHERE id = @id;

-- i

Etant donnée qu'il peut y avoir plusieurs fois le prénom dans la table lecteur,
nous devons limiter le retour de la requête à 1 dans la requête g).
La requête h) peut échouer si @id vaut NULL, par exemple, quand un lecteur n'a pas été trouvé

--

mysqldump -uroot bibliotheque > backup_final.sql

--

mysql -uroot bibliotheque < backup_final.sql

echo "0 2 * * * mysqldump -u [utilisateur] -p[password] [nom_de_la_base] > /chemin/vers/le/dossier/sauvegarde/backup-\$(date +\%F).sql" | crontab -
