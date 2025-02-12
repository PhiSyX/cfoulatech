-- Change temporairement le délimiteur à `$$`
DELIMITER $$

-- Création de la procédure `procedure-name` où les `<>` de la ligne suivante,
-- NE DOIVENT PAS être mis.
--
-- Attention:
--   `CREATE OR REPLACE` ne fonctionne que sur MariaDB.
CREATE PROCEDURE <procedure-name>()
BEGIN
	-- Vos requêtes, ex:
	SELECT * FROM <table>;
END$$


-- Création de la procédure `procedure-name` avec des paramètres en entrées.
-- où les `<>` de la ligne suivante NE DOIVENT PAS être mis.
--
-- Attention:
-- 	Les noms de variables NE DOIVENT PAS correspondre aux noms des champs.
CREATE PROCEDURE <procedure-name>(
	IN variable_name1 VARCHAR(5),
	IN variable_name2 int(11)
)
BEGIN
	-- Vos requêtes, ex:
	SELECT * FROM <table> WHERE <field> = variable_name1;
END$$


-- SELECT COUNT(*) FROM users WHERE city IN ('Bruxelles', 'Brussels');

-- Création de la procédure `procedure-name` avec des paramètres en sorties.
-- où les `<>` de la ligne suivante NE DOIVENT PAS être mis.
--
-- Attention:
-- 	Les noms de variables NE DOIVENT PAS correspondre aux noms des champs.
CREATE PROCEDURE <procedure-name>(
	IN variable_name1 VARCHAR(5),
	OUT returns_names1 int(11)
)
BEGIN
	-- Vos requêtes, ex:
	SELECT * INTO returns_names1 FROM <table> WHERE <field> = variable_name1;
END$$


-- On remet le délimiteur à sa valeur initiale `;`
DELIMITER ;
