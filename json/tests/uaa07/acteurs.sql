-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 19 mai 2025 à 10:39
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `acteur_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `acteurs`
--

CREATE TABLE `acteurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `site` varchar(100) NOT NULL,
  `nationalite` varchar(50) NOT NULL DEFAULT 'Belge',
  `genre` varchar(1) NOT NULL,
  `age` int(11) NOT NULL,
  `film` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `acteurs`
--

INSERT INTO `acteurs` (`id`, `nom`, `email`, `site`, `nationalite`, `genre`, `age`, `film`) VALUES
(1, 'Benoît Poelvoorde', 'benoit@poelvoorde.be', 'https://benoitpoelvoorde.be', 'Belge', 'H', 60, 'C\'est arrivé près de chez nous'),
(2, 'Vincent Cassel', 'vincent@cassel.fr', 'https://www.vincentcassel.com/', 'Française', 'H', 58, 'La Haine'),
(3, 'Scarlett Johansson', 'scarlett@johansson.com', 'https://www.s-johansson.org/', 'Américaine', 'F', 40, 'L\'Irrésistible North'),
(4, 'Emma Watson', 'emma@watson.com', 'https://www.emmawatson.net/', 'Britannique', 'F', 35, 'Harry Potter à l\'école des sorciers'),
(5, 'Bella Ramsey', 'bella@ramsey.com', 'http://bellaramsey.com/', 'Américaine', 'X', 21, 'Catherine Called Birdy');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `acteurs`
--
ALTER TABLE `acteurs`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `acteurs`
--
ALTER TABLE `acteurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
