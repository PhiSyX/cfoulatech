-- Change temporairement le délimiteur à `$$`
DELIMITER $$

-- Création de la procédure `procedure-name` où les `<>` de la ligne suivante,
-- NE DOIVENT PAS être mis.
--
-- ATTENTION:
--
--   `CREATE OR REPLACE` ne fonctionne que sur MariaDB.
CREATE PROCEDURE <procedure-name>()
BEGIN
	-- Vos requêtes, ex:
	SELECT * FROM <table>;
END$$


-- Création de la procédure `procedure-name` avec des paramètres en entrées, où
-- les `<>` de la ligne suivante NE DOIVENT PAS être mis.
--
-- ATTENTION:
--
--  Les noms de variables des paramètres NE DOIVENT PAS correspondre aux noms
--  des champs.
CREATE PROCEDURE <procedure-name>(
	IN <variable_name1> <type>,
	IN <variable_name2> <type>
)
BEGIN
	-- Vos requêtes, ex:
	SELECT * FROM <table> WHERE <field> = <variable_name>;
END$$


-- SELECT COUNT(*) FROM users WHERE city IN ('Bruxelles', 'Brussels');

-- Création de la procédure `procedure-name` avec des paramètres en sorties, où
-- les `<>` de la ligne suivante NE DOIVENT PAS être mis.
--
-- ATTENTION:
--
--  Les noms de variables NE DOIVENT PAS correspondre aux noms des champs.
CREATE PROCEDURE <procedure-name>(
	IN <variable_name1> <type>,
	OUT <output_name1> <type>
)
BEGIN
	-- Vos requêtes, ex:
	SELECT COUNT(*) INTO <output_name> FROM <table> WHERE <field> = <variable_name>;
END$$


-- On remet le délimiteur à sa valeur initiale `;`.
-- L'espace entre DELIMITER et `;` est important.
DELIMITER ;
