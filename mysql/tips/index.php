<!DOCTYPE html>
<html lang="fr">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>MySQL Aide-mémoire</title>
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
	<link rel="stylesheet" href="https://necolas.github.io/normalize.css/8.0.1/normalize.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/tokyo-night-dark.min.css" />
	<link rel="stylesheet" href="assets/css/style.css?t=<?= filemtime('./assets/css/style.css') ?>">
</head>

<body class="container">
	<?php include "assets/svg/logo.svg" ?>

	<h1>
		<small>Aide-mémoire</small>
	</h1>

	<section id="toc">
		<p>
			<strong>Ligne de commande</strong>
		</p>

		<ul>
			<li><a href="#mysql-cli-connect">Connexion à la base de données</a></li>
			<li><a href="#mysql-cli-import">Importer à la base de données</a></li>
			<li><a href="#mysql-cli-export">Exporter à la base de données</a></li>
		</ul>

		<p>
			<strong>Opérations</strong>
		</p>

		<ul>
			<li><a href="#mysql-ops-db">Opérations sur les bases de données</a></li>
			<li>
				<a href="#mysql-ops-table">Opérations sur les tables</a>
				<ul>
					<li><a href="#mysql-ops-table-insert">INSERT</a></li>
					<li><a href="#mysql-ops-table-select">SELECT</a></li>
					<li><a href="#mysql-ops-table-update">UPDATE</a></li>
					<li><a href="#mysql-ops-table-delete">DELETE</a></li>
				</ul>
			</li>
		</ul>

		<p>
			<strong>Procédures stockées</strong>
		</p>

		<ul>
			<li><a href="#mysql-stored-procedure-create">Création d'une procédure</a></li>
			<li><a href="#mysql-stored-procedure-show">Voir toutes les procédures d'une table</a></li>
			<li><a href="#mysql-stored-procedure-delete">Suppression d'une procédure</a></li>

			<li><a href="#mysql-stored-procedure-in-param">Paramètre d'entrée (<code>IN</code>)</a></li>
			<li><a href="#mysql-stored-procedure-out-param">Paramètre de sortie (<code>OUT</code>)</a></li>
			<li><a href="#mysql-stored-procedure-inout-param">Paramètre IO (<code>INOUT</code>)</a></li>
		</ul>
	</section>

	<main>
		<section id="mysql-cli">
			<details open>
				<summary>Ligne de commande</summary>

				<h1>Ligne de commande</h1>

				<div id="mysql-cli-connect">
					<p>Pour se connecter à une base de donnée en ligne de commande :</p>

					<pre><code>mysql -u&lt;dbuser&gt; &lt;dbname&gt; &lt;-p&gt;</code></pre>
				</div>

				<div id="mysql-cli-import">
					<p>
						Pour importer une base de données depuis un fichier, en ligne
						de commande :
					</p>

					<pre><code>mysql -u&lt;dbuser&gt; &lt;-p&gt; &lt;dbname&gt; &lt; &lt;dbname&gt;.sql</code></pre>

					<p>
						Cette commande va permettre de prendre tout le contenu du fichier
						.sql et appliquer les commandes, instructions et opérations inclus
						dans le fichier sur la base de données choisie.
					</p>
				</div>

				<div id="mysql-cli-export">
					<p>
						Pour exporter une base de données dans un fichier, en ligne de commande :
					</p>

					<pre><code>mysql-dump -u&lt;dbuser&gt; &lt;-p&gt; &lt;dbname&gt; > &lt;dbname&gt;.sql</code></pre>
				</div>
			</details>
		</section>

		<section id="mysql-ops-db">
			<details open>
				<summary>Opérations sur les bases de données</summary>

				<h1>Opérations sur les bases de données</h1>

				<p>
					Une fois connectée, nous pouvons sélectionner une base de
					données, si nous avons omis de la préciser dans la commande
					de connexion ou si nous nous sommes trompé :
				</p>

				<pre><code>MariaDB [(none)]> use &lt;dbname&gt;</code></pre>

				<dl class="grid-2">
					<dt>Database changed</dt>
					<dd>Commande réussie.</dd>

					<dt>ERROR 1049 (42000): Unknown database '&lt;dbname&gt;'</dt>
					<dd>La base de données entrée n'existe pas</dd>
				</dl>

				<p>
					Si nous ne connaissons pas la base de données, nous pouvons
					visualiser la liste des base de données en utilisant la
					commande suivante :
				</p>

				<pre><code>MariaDB [(none)]> SHOW DATABASES;</code></pre>

				<p>Exemple de liste avec la commande précédente :</p>
				<pre class="text-center">
+-----------------------+
| Database              |
+-----------------------+
| bdd_exercices         |
| coursmysql            |
| information_schema    |
| mediamarkt            |
| mysql                 |
| performance_schema    |
| phpmyadmin            |
| sqlpays               |
| test                  |
| tp_currency_converter |
| villesfrance          |
+-----------------------+
				</pre>

				<p>
					Toutefois, il se peut que nous n'avons pas encore de base
					de données. Et bien nous pouvons en créer :
				</p>

				<pre><code>MariaDB [(none)]> CREATE DATABASE &lt;dbname&gt; CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;</code></pre>

				<p>Ce que l'on peut obtenir avec la commande précédente :</p>

				<dl class="grid-2">
					<dt>Query OK, 1 row affected (&lt;n&gt; sec)</dt>
					<dd>Cela veut dire que la commande a réussie.</dd>

					<dt>ERROR 1007 (HY000): Can't create database '&lt;dbname&gt;'; database exists</dt>
					<dd>Cela veut dire que la commande a échoué, car la base de données entrée existe déjà.</dd>
				</dl>

				<p>
					Si cette base de données ne nous intéresse plus, nous
					pouvons la supprimer :
				</p>

				<pre><code>MariaDB [(none)]> DROP DATABASE &lt;dbname&gt;;</code></pre>

				<p>Ce que l'on peut obtenir avec la commande précédente :</p>

				<dl class="grid-2">
					<dt>Query OK, 0 rows affected, 2 warnings (&lt;n&gt; sec)</dt>
					<dd>Commande réussie</dd>

					<dt>ERROR 1008 (HY000): Can't drop database '&lt;dbname&gt;'; database doesn't exist </dt>
					<dd>Commande échouée, la base de données entrée n'existe pas.</dd>
				</dl>
			</details>
		</section>

		<section id="mysql-ops-table">
			<details open>
				<summary>Opérations sur les tables</summary>

				<h1>Opérations sur les tables</h1>

				<p>
					Une fois une base de données sélectionnée, pour visualiser
					la liste des tables de cette base de données, nous pouvons
					utiliser la commande suivante :
				</p>

				<pre><code>MariaDB [dbname]> SHOW TABLES;</code></pre>

				<p>Exemple de ce que l'on peut obtenir avec la commande précédente :</p>
				<pre>
+------------------+
| Tables_in_dbname |
+------------------+
| articles         |
| users            |
+------------------+
2 rows in set (&lt;n&gt; sec)
				</pre>

				<p>
					Il se peut qu'il n'existe aucune tables avec la commande précédente.
					Bien évidemment, nous pouvons en créer de nouvelles:
					<a href="https://mariadb.com/kb/en/create-table/" rel="noreferrer noopener" target="_blank">
						https://mariadb.com/kb/en/create-table/
					</a>
				</p>

				<p>Exemple simple d'une table <code>users</code>.</p>

				<pre><code>MariaDB [dbname]></code><code class="language-sql">CREATE TABLE users (
	id int NOT NULL AUTO_INCREMENT,
	username varchar(30) NOT NULL,
	email varchar(140) NOT NULL,
	password varchar(255) NOT NULL,
	PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;</code></pre>

				<p>
					Il se peut aussi que l'on veuille ajouter, supprimer ou
					modifier des champs, pour cela, nous pouvons utiliser des
					opérations sur la commande ALTER TABLE :
				</p>

				<pre><code>MariaDB [dbname]></code><code>ALTER TABLE &lt;table> ADD &lt;field> VARCHAR(255) NOT NULL;
ALTER TABLE &lt;table> DROP &lt;field>;
ALTER TABLE &lt;table> CHANGE &lt;old-field> &lt;new-field> VARCHAR (255) NOT NULL;</code></pre>

				<p>
					Si nous voulons afficher la structure d'une table en un
					coup d'oeil, nous pouvons utiliser la commande suivante :
				</p>

				<pre><code>MariaDB [dbname]></code><code>DESCRIBE &lt;tablename&gt;</code></pre>

				<p>Exemple de ce que l'on peut obtenir avec la commande précédente :</p>

				<pre>
+---------------+--------------+------+-----+---------+----------------+
| Field         | Type         | Null | Key | Default | Extra          |
+---------------+--------------+------+-----+---------+----------------+
| id            | int(11)      | NO   | PRI | NULL    | auto_increment |
| username      | varchar(30)  | NO   |     | NULL    |                |
| email         | varchar(140) | NO   |     | NULL    |                |
| password      | varchar(255) | NO   |     | NULL    |                |
+---------------+--------------+------+-----+---------+----------------+
4 rows in set (&lt;n> sec)
				</pre>


				<details id="mysql-ops-table-insert" open>
					<summary>INSERT</summary>

					<h2>INSERT</h2>

					<p>
						Insérer des données dans une table, voir :
						<a href="https://mariadb.com/kb/en/insert/" rel="noopener noreferrer" target="_blank">
							https://mariadb.com/kb/en/insert/
						</a>
					</p>

					<ol>
						<li>
							<p>Pour un seul enregistrement</p>

							<pre><code class="language-sql">INSERT INTO &lt;table> (
    `&lt;field1>`,
    `&lt;field2>`
) VALUES ( -- 1 row
    "&lt;value of field1>",
    "&lt;value of field2>"
);</code></pre>
						</li>

						<li>
							<p>
								Pour plusieurs enregistrements, il suffit de
								séparer par des virgules
							</p>

							<pre><code class="language-sql">INSERT INTO &lt;table> (
    `&lt;field1>`,
    `&lt;field2>`
) VALUES ( -- 1 row
    "&lt;value of field1>",
    "&lt;value of field2>"
), ( -- 2 rows
    "&lt;value of field1>",
    "&lt;value of field2>"
), ( -- 3 rows, etc...
    "&lt;value of field1>",
    "&lt;value of field2>"
);</code></pre>
						</li>
					</ol>
				</details>

				<details id="mysql-ops-table-select" open>
					<summary>SELECT</summary>

					<h2>SELECT</h2>

					<p>
						Récupérer des données dans une table, voir :
						<a href="https://mariadb.com/kb/en/select/" rel="noopener noreferrer" target="_blank">
							https://mariadb.com/kb/en/select/
						</a>
					</p>

					<pre><code class="language-sql">SELECT * FROM &lt;table> LIMIT &lt;position>, &lt;count>;</code></pre>

					<p>
						La <code>&lt;position></code> commence à
						<strong>0</strong>, et le <code>&lt;count></code>
						à <strong>1</strong>.
					</p>

					<p>
						Exemple avec ce jeu de données :
					</p>

					<pre>
+---------+-----------+
| id_user | firstname |
+---------+-----------+
|       1 | James     |
|       2 | Jack      |
|       3 | Lara      |
|       4 | Yellow    |
|       5 | Kevin     |
|       6 | Eden      |
|       7 | Mario     |
|       8 | Alicia    |
|       9 | Julienne  |
|      10 | David     |
+---------+-----------+
							</pre>

					<p>
						Si nous devons récupérer 2 enregistrements à
						partir 6ème enregistrement, cela veut dire que
						le 6ème enregistrement est inclus dans le
						résultat. Par exemple :
					</p>

					<pre><code class="language-sql">SELECT * FROM users LIMIT 6,2;</code></pre>

					<p>Sortie de l'exemple ci-haut :</p>

					<pre>
+---------+-----------+
| id_user | firstname |
+---------+-----------+
|       1 | James     | 0
|       2 | Jack      | 1
|       3 | Lara      | 2
|       4 | Yellow    | 3
|       5 | Kevin     | 4
|       6 | Eden      | 5
|       7 | Mario     | 6, 1
|       8 | Alicia    | 7, 2
|       9 | Julienne  | 8
|      10 | David     | 9
+---------+-----------+
							</pre>

					<p>
						Si nous devons récupérer <strong>3</strong>
						enregistrements <strong>après</strong> le 6ème
						enregistrement, cela veut dire que le 6ème
						enregistrement <strong>n'est pas inclus</strong>
						dans le résultat. Donc nous devons augmenter
						la <code>&lt;position></code> de <strong>1</strong>.
					</p>

					<pre>
MariaDB [dbname]> SELECT * FROM users LIMIT 7,3;

+---------+-----------+
| id_user | firstname |
+---------+-----------+
|       1 | James     | 0
|       2 | Jack      | 1
|       3 | Lara      | 2
|       4 | Yellow    | 3
|       5 | Kevin     | 4
|       6 | Eden      | 5
|       7 | Mario     | 6
|       8 | Alicia    | 7, 1
|       9 | Julienne  | 8, 2
|      10 | David     | 9, 3
+---------+-----------+
					</pre>
				</details>

				<details id="mysql-ops-table-update" open>
					<summary>UPDATE</summary>
					<h1>UPDATE</h1>

					<p>
						Mettre à jour des données dans une table, voir :
						<a href="https://mariadb.com/kb/en/update/" target="_blank" rel="noopener noreferrer">
							https://mariadb.com/kb/en/update/
						</a>
					</p>

					<p>Voici la syntaxe :</p>

					<pre><code class="language-sql">UPDATE &lt;table>
    SET
        &lt;field1> = &lt;value1>,
        &lt;field2> = &lt;value2>
    WHERE
        &lt;field3> = &lt;value3>
;</code></pre>

					<p>
						Considérer de toujours mettre une condition
						<code>WHERE</code> sinon tous les enregistrements
						seront affectés.
					</p>
				</details>



				<details id="mysql-ops-table-delete" open>
					<summary>DELETE</summary>
					<h1>DELETE</h1>

					<p>
						Supprimer des données dans une table, voir :
						<a href="https://mariadb.com/kb/en/delete/" target="_blank" rel="noopener noreferrer">
							https://mariadb.com/kb/en/delete/
						</a>
					</p>

					<p>Syntaxe de base :</p>

					<pre><code class="language-sql">DELETE FROM &lt;table> WHERE &lt;condition>;</code></pre>

					<p>
						Considérer de toujours mettre une condition
						<code>WHERE</code> sinon tous les enregistrements
						seront affectés.
					</p>

					<p>
						Supprimer des données dans une table en réinitialisant
						les incrémentations, voir :
						<a href="https://mariadb.com/kb/en/truncate-table/" target="_blank" rel="noopener noreferrer">
							https://mariadb.com/kb/en/truncate-table/
						</a>
					</p>

					<pre><code class="language-sql">TRUNCATE TABLE &lt;table>;</code></pre>

					<p>
						<code>TRUNCATE TABLE</code> va échouer sur une table en InnoDB
						s'il y a des contraintes sur les clés étrangères sur
						d'autres tables faisant référence à la table en question:
					</p>

					<pre><code>ERROR 1701 (42000): Cannot truncate a table referenced in a foreign key constraint</code></pre>
				</details>
			</details>
		</section>

		<section id="mysql-stored-procedure">
			<details open>
				<summary>Les procédures stockées</summary>

				<h1>Les procédures stockées</h1>

				<p>
					Avant de créer une procédure, nous devons changer temporairement
					le caractère de délimitation via la commande <code>DELIMITER</code>,
					la syntaxe est la suivante :
				</p>

				<pre><code class="language-sql">DELIMITER &lt;delim></code></pre>

				<p>Par exemple :</p>

				<pre><code class="language-sql">DELIMITER $$
DELIMITER //
DELIMITER ##</code></pre>

				<p>
					Cela nous permet maintenant de mettre en fin de commande SQL
					la délimitation préalablement définie,
					par exemple pour la délimitation <strong>$$</strong> :
				</p>

				<pre><code class="language-sql">SELECT * FROM &lt;table>$$</code></pre>

				<p>
					En faisant cela, la requête va bien s'executer.<br />
					On doit faire cela pour éviter d'entrer en conflit avec
					les instructions de création de procédure.<br />
					À la fin de la création de procédure, nous devons remettre
					la délimitation à sa valeur initiale, qui est <strong>;</strong>
				</p>


				<details id="mysql-stored-procedure-create" open>
					<summary>Création d'une procédure</summary>
					<h2>Création d'une procédure</h2>
					<p>Voici la syntaxe de création d'une procédure :</p>
					<pre><code class="language-sql">DELIMITER <delim>

CREATE PROCEDURE &lt;procedure-name>()
BEGIN
	-- Vos requêtes, ex:
	SELECT * FROM &lt;table> WHERE &lt;field> = ?;
END&lt;delim>

DELIMITER ;</code></pre>

					<p>
						L'appel de la procédure se fait avec l'instruction
						<code>CALL</code> et peut être appelé autant de fois
						que l'on veut.
					</p>

					<pre><code class="language-sql">CALL &lt;procedure-name>();</code></pre>

					<p>Exemple:</p>

					<pre><code class="language-sql">DELIMITER $$

CREATE PROCEDURE getListUsers()
BEGIN
	SELECT * FROM users;
END$$

DELIMITER ;

CALL getListUsers();</code></pre>

					<p>
						Exemple de sortie, s'il y a des enregistrements
						dans la table <strong>users</strong> :
					</p>

					<pre>
+---------+-----------+----------+
| id_user | firstname | lastname |
+---------+-----------+----------+
|       1 | James     | Bond     |
|       2 | Jack      | Bauer    |
|       3 | Lara      | Croft    |
|       5 | Yellow    | Blue     |
+---------+-----------+----------+
4 rows in set (&lt;t> sec)

Query OK, 0 rows affected (&lt;t> sec)
					</pre>
				</details>

				<details id="mysql-stored-procedure-show" open>
					<summary>Voir toutes les procédures d'une table</summary>
					<h2>Voir toutes les procédures d'une table</h2>
					<pre><code>SHOW PROCEDURE STATUS WHERE DB = '&lt;database>';</code></pre>
				</details>

				<details id="mysql-stored-procedure-delete" open>
					<summary>Suppression d'un procédure</summary>
					<h2>Suppression d'un procédure</h2>
					<pre><code>DROP PROCEDURE &lt;procecure-name>;</code></pre>
				</details>

				<details id="mysql-stored-procedure-in-param" open>
					<summary>Paramètres d'entrées (<code>IN</code>)</summary>
					<h2>Paramètres d'entrées (<code>IN</code>)</h2>

					<p>
						Il est possible pour une procédure de recevoir des entrées
						utilisateurs, entre les parenthèses de la procédure,
						avec le mot-clé <code>IN</code>, pour <strong>Input</strong>.
					</p>

					<p>
						Nous pourrons utiliser ces entrées utilisateurs à
						l'intérieur de la procédure pour créer nos requêtes, ex:
					</p>

					<pre><code class="language-sql">CREATE PROCEDURE &lt;procedure-name>(
    in &lt;var-name1> &lt;type>,
    in &lt;var-name2> &lt;type>
)
BEGIN
	-- Vos requêtes, ex:
	SELECT * FROM &lt;table> WHERE &lt;field> = &lt;var-name1>;
END&lt;delim></code></pre>

					<p>
						Avec les paramètres d'entrées, l'appel de la procédure
						se fait de cette manière :
					</p>

					<pre><code class="language-sql">CALL &lt;procedure-name>( &lt;valeur1>, &lt;valeur2> );</code></pre>

					<p>
						Par convention de nommages, je vais préfixer les noms
						des paramètres d'entrées par <strong>i_</strong> pour input.
					</p>

					<p>Exemple :</p>

					<p>
						Cette procédure récupère tous les utilisateurs de la
						table <strong>users</strong> venant d'une ville donnée
						par l'utilisateur.
					</p>

					<pre><code class="language-sql">DELIMITER $$

CREATE PROCEDURE getUsersFromCity(in i_city varchar(40))
BEGIN
	SELECT * FROM users WHERE city = i_city;
END$$

DELIMITER ;

CALL getUsersFromCity("Bruxelles");</code></pre>

					<p>
						Exemple de sortie, s'ily a des enregistrements
						dans la table <strong>users</strong> :
					</p>

					<pre>
+---------+-----------+----------+-----------+
| id_user | firstname | lastname | city      |
+---------+-----------+----------+-----------+
|       1 | Mike      | S.       | Bruxelles |
+---------+-----------+----------+-----------+
1 rows in set (&lt;t> sec)

Query OK, 0 rows affected (&lt;t> sec)
						</pre>
				</details>

				<details id="mysql-stored-procedure-out-param" open>
					<summary>Paramètre de sortie (<code>OUT</code>)</summary>
					<h2>Paramètre de sortie (<code>OUT</code>)</h2>

					<p>
						Il est possible pour une procédure d'émettre un
						résultat de sortie à l'utilisateur, avec le mot-clé
						<code>OUT</code> pour <strong>Output</strong>.
					</p>

					<p>
						Nous pourrons associer des résultats à l'intérieur de
						la procédure lors de la création de nos requêtes avec
						le mot clé <code>INTO</code> suivi du nom du paramètre
						de sortie, voici un exemple :
					</p>

					<pre><code class="language-sql">CREATE PROCEDURE &lt;procedure-name>(out &lt;output_name> &lt;type>)
BEGIN
	-- Vos requêtes, ex:
	SELECT COUNT(*) INTO &lt;output_name> FROM &lt;table>;
END&lt;delim></code></pre>

					<p>
						Avec les paramètres de sorties, l'appel de la procédure
						se fait de cette manière :
					</p>

					<pre><code class="language-sql">CALL &lt;procedure-name>( @&lt;var-name> );</code></pre>

					<p>
						Le caractère <code>@</code> DOIT être préfixé d'un nom
						de la variable. Pour afficher cette variable
						<code>@&lt;var-name></code>, nous devons utiliser
						l'opération de sélection <code>SELECT</code>:
					</p>

					<pre><code>SELECT @&lt;var-name>;</code></pre>

					<p>
						Par convention de nommages, je vais préfixer les noms
						des paramètres de sorties par <strong>o_</strong>
						pour output.
					</p>

					<p>Exemple:</p>
					<p>
						Cette procédure récupère le nombre total d'utilisateurs
						de la table <strong>users</strong>.
					</p>

					<pre><code class="language-sql">DELIMITER $$

CREATE PROCEDURE getTotalUsers(out o_total int(11))
BEGIN
	SELECT COUNT(*) INTO o_total FROM users;
END$$

DELIMITER ;

CALL getTotalUsers(@total_users);
SELECT @total_users;</code></pre>

					<p>
						Exemple de sortie, s'ily a des enregistrements dans
						la table <strong>users</strong> :
					</p>

					<pre>
+--------------+
| @total_users |
+--------------+
|           30 |
+--------------+
1 rows in set (&lt;t> sec)
					</pre>
				</details>

				<details id="mysql-stored-procedure-inout-param" open>
					<summary>Paramètre IO (<code>INOUT</code>)</summary>
					<h2>Paramètre IO (<code>INOUT</code>)</h2>

					<p>
						Il est possible pour une procédure de recevoir une entrée
						et en même temps d'émettre un résultat de sortie à
						l'utilisateur, avec le mot-clé
						<code>INOUT</code>, pour <strong>Input Output</strong>.
					</p>

					<pre><code class="language-sql">CREATE PROCEDURE &lt;procedure-name>(
    inout &lt;var_name1> &lt;type>
)
BEGIN
	-- Vos requêtes, ex:
	SELECT COUNT(*) INTO &lt;var_name1> FROM &lt;table>;
END&lt;delim></code></pre>

					<p>
						L'appel de la procédure se fait de cette manière :
					</p>

					<pre><code>SET @&lt;var-name> = &lt;default-value>;
CALL &lt;procedure-name>( @&lt;var-name> );</code></pre>

					<p>
						Pour afficher cette variable <code>@&lt;var-name></code>,
						nous devons utiliser l'opération de sélection <code>SELECT</code>:
					</p>

					<pre><code class="language-sql">SELECT @&lt;var-name>;</code></pre>

					<p>
						Par convention de nommages, je vais préfixer les noms
						des paramètres de sorties par <strong>io_</strong>
						pour input/output.
					</p>

					<p>Exemple :</p>

					<pre><code class="language-sql">DELIMITER $$

CREATE OR REPLACE PROCEDURE incrementCounter(
    inout counter int(11),
    in step tinyint
)
BEGIN
	SET counter = counter + step;
END$$

CREATE OR REPLACE PROCEDURE decrementCounter(
    inout counter int(11),
    in step tinyint
)
BEGIN
	SET counter = counter - step;
END$$

DELIMITER ;

SET @counter = 0;
CALL incrementCounter(@counter, 1); -- 1
CALL incrementCounter(@counter, 2); -- 3
CALL incrementCounter(@counter, 3); -- 6
SELECT @counter; -- 6

CALL decrementCounter(@counter, 2); -- 4
SELECT @counter; -- 4</code></pre>

					<p>Exemple de sortie, à la suite de ces opérations :</p>

					<pre>
+----------+
| @counter |
+----------+
|        6 |
+----------+
1 row in set (&lt;t> sec)

+----------+
| @counter |
+----------+
|        4 |
+----------+
1 row in set (&lt;t> sec)
					</pre>
				</details>
			</details>

		</section>

	</main>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
	<script type="module" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/es/core.min.js"></script>
	<script type="module" src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/languages/sql.min.js"></script>
	<script>
		hljs.highlightAll();
	</script>
</body>

</html>
