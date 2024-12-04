-- 1) Les numéros de chambres avec TV.
SELECT
	num_chambre,
	equipement
FROM chambres
WHERE equipement = "TV";

-- 2) Les numéros de chambres et leurs capacités du 4ème au 9ème enregistrement
--    à partir du 3ème (2), récupérer 2 lignes
SELECT
	num_chambre,
	nombre_personne
FROM chambres
LIMIT 3, 6;

-- 3) La capacité théorique d'accueil de l'hôtel et donnez comme nom de colonne
--    « La capacité maximum des personnes dans l'hôtel ».
SELECT
	SUM(nombre_personne) AS "La capacité maximum des personnes dans l'hôtel"
FROM chambres;

-- 4) Le prix par personne des chambres avec TV.
SELECT TRUNCATE(prix / nombre_personne, 2) AS prix_par_personne
FROM chambres
WHERE equipement = "TV";

-- 5) Les dates de réservation, numéros des chambres et le numéro des clients
--    ayant réservé à partir du 09/02/21
SELECT *
FROM reservations
WHERE date_arr >= "2021-02-09";

-- 6) Les Confort, prix et numéros des chambres coûtant au maximum 80 Euros ou
--    ayant une salle de bain coûtant au maximum 120 Euros.
SELECT
	confort,
	prix,
	num_chambre
FROM chambres
WHERE prix <= 80
   OR (
		confort = "Salle de bain"
		AND prix <= 120
   );

-- 7) Les Noms, Prénoms et adresses des clients dont le nom commence par "D"
--    ordonnez par ordre décroissant sur leurs prénoms.
SELECT
	nom,
	prenom,
	ville
FROM clients
WHERE nom LIKE "D%"
ORDER BY prenom DESC;

-- 8) Le nombre de chambres dont le prix est entre 85 et 120 Euros, donnez comme
--    nom de colonne « Le nombre de chambre entre 85 et 120 Euros ».
SELECT
	COUNT(*) AS "Le nombre de chambre entre 85 et 120 Euros"
FROM chambres
WHERE prix BETWEEN 85 AND 120;

-- 9) Les chambres dont le numéro de chambre est 1 ou 3 ou 5 ou 7 ou 9, Ou le
--    confort est Jacuzzi ou Salle de bain, Ou l’équipement est Home cinéma ou
--    Wifi.
SELECT *
FROM chambres
WHERE
	   num_chambre IN (1, 3, 5, 7, 9)
	OR confort     IN ("Jacuzzi", "Salle de bain")
	OR equipement  IN ("Home cinéma", "Wifi");

-- 10) Le nombre de client regroupé par leurs villes en donnant comme nom de
--     colonne « Le nombre de clients venant de » ( + affichez la ville).
SELECT
	COUNT(*) AS "Le nombre de clients venant de",
	ville
FROM clients
GROUP BY ville;

-- 11) Les noms des clients et la date de réservations, ayant réservé en 2020.
--     (BONUS)

-- INNER JOIN: Affiche uniquement les clients qui ont une correspondance dans
-- les deux tables, c’est-à-dire des clients ayant fait au moins une
-- réservation. Les clients qui n'ont pas fait de réservation (ou qui n'en ont
-- pas fait en 2020) seront exclus des résultats.


SELECT c.nom, r.date_arr
FROM clients AS c
INNER JOIN reservations AS r ON c.num_client = r.num_client
WHERE YEAR (r.date_arr) = 2020;
