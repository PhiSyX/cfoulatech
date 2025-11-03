/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.0.2-MariaDB, for osx10.21 (arm64)
--
-- Host: 127.0.0.1    Database: MI08
-- ------------------------------------------------------
-- Server version	12.0.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `adresses`
--

DROP TABLE IF EXISTS `adresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `adresses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rue` varchar(255) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `pays` varchar(255) NOT NULL,
  `ville` varchar(255) NOT NULL,
  `geoloc_gps` varchar(255) NOT NULL,
  `code_postal` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_ADDRESS` (`rue`,`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adresses`
--

LOCK TABLES `adresses` WRITE;
/*!40000 ALTER TABLE `adresses` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `adresses` VALUES
(1,'Avenue du scrum master','42','France','Paris','0,0',75009),
(2,'Rue des symfonystes','42','Belgique','Bruxelles','0,0',1070),
(3,'Rue des Microservices','12','Belgique','Bruxelles','0,0',1080),
(4,'Steenweg op Gierle','130','Belgique','TURNHOUT','0,0',2300),
(5,'Eelstraat','5a','Belgique','Ravels','0,0',2380),
(6,'Rue Pierre Decoster','94b C01','Belgique','Bruxelles','0,0',1190),
(7,'Rue Grimard','93','Belgique','Montignies-sur-Sambre','0,0',6961),
(8,'Rue Leon Bernus','24b 3G','Belgique','Charleroi','0,0',6000),
(9,'Rue Victor Libert','7b 41c','Belgique','Marche-en-Famenne','0,0',6900),
(10,'Magere Schorre','36A ','Belgique','Knokke','0,0',8300),
(11,'du Roy de Bliquylaan','33','Belgique','Sterrebeek','0,0',1933);
/*!40000 ALTER TABLE `adresses` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `annonces`
--

DROP TABLE IF EXISTS `annonces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `annonces` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int(11) NOT NULL,
  `propriete_id` int(11) NOT NULL,
  `message` longtext NOT NULL,
  `type` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_CB988C6F18566CAF` (`propriete_id`),
  KEY `IDX_CB988C6FFB88E14F` (`utilisateur_id`),
  CONSTRAINT `FK_CB988C6F18566CAF` FOREIGN KEY (`propriete_id`) REFERENCES `proprietes` (`id`),
  CONSTRAINT `FK_CB988C6FFB88E14F` FOREIGN KEY (`utilisateur_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `annonces`
--

LOCK TABLES `annonces` WRITE;
/*!40000 ALTER TABLE `annonces` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `annonces` VALUES
(1,4,1,'À vendre : charmante maison certifiée Agile, parfaitement adaptée à un Scrum Master en quête de sérénité.\n\nPrix négociable uniquement en user stories bien rédigées','vente','2025-10-31 22:38:36'),
(2,5,2,'Vous rêvez d’un habitat structuré, robuste et scalable ?\nNe cherchez plus : cette maison pensée par un développeur Symfony allie rigueur, logique et un soupçon de PHP artisanal (dans le bon sens du terme).','vente','2025-10-31 22:56:42'),
(3,6,3,'Vous cherchez une maison robuste, performante et scalable ?\nNe cherchez plus : cette Maison Spring Boot est faite pour vous !\n\nGrâce à son architecture modulaire, ses dépendances bien gérées et son environnement entièrement configurable, elle vous offrira un cadre de vie stable — même quand tout le reste passe en production.\n\nIdéale pour un développeur Java, un architecte logiciel ou toute personne qui pense que “Spring” n’est pas qu’une saison, mais un style de vie.\n\nAttention : le propriétaire actuel refuse de vendre à tout acheteur utilisant encore des servlets JSP sans framework.\n\nVenez la visiter : un simple @RequestMapping(\"/visite\") suffit pour planifier un rendez-vous.','vente','2025-10-31 23:08:12'),
(4,10,4,'Chateau à vendre, contactez au plus vite','vente','2025-10-31 23:00:12'),
(5,10,5,'Hoogwaardig afgewerkte nieuwbouw woning met aangelegde tuin in landelijke omgeving op 1052 m²','vente','2025-10-31 23:06:17'),
(6,10,6,'Forest | Loft 2 chambres avec extérieurs\nIntéressé ?','location','2025-10-31 23:12:19'),
(7,11,7,'Kot à louer','location','2025-11-01 10:49:06'),
(8,11,8,'Kot à louer\n1 chambre | 250 m²mètres carrés\n\nRue Leon Bernus 24 Boîte 3G  6000 — Charleroi','location','2025-11-01 10:51:59'),
(9,11,9,'Appartement à louer\n','location','2025-11-01 10:55:10'),
(10,12,10,'Projet neuf, prix non négociable, parce que je suis un baron','vente','2025-11-01 11:02:28'),
(11,12,11,'LES VILLAS DU PROJET STEREA\n\nDisponible le	15 juillet 2026 - 00:00\nQuartier ou lieu-dit	Projets Bruxelles Est\nLe certificat amiante est disponible	Non communiqué','vente','2025-11-01 11:05:44');
/*!40000 ALTER TABLE `annonces` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `utilisateur_id` int(11) DEFAULT NULL,
  `nom_complet` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `sujet` varchar(255) NOT NULL,
  `message` longtext NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_41278201FB88E14F` (`utilisateur_id`),
  CONSTRAINT `FK_41278201FB88E14F` FOREIGN KEY (`utilisateur_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `contact_messages` VALUES
(1,NULL,'John Doe','john@doe.org','0123456789','J\'ai des petits problèmes dans ma plantation','Pourquoi ça pousse pas ? J\'essaie de comprendre, mais je n\'y arrive pas.','2025-10-17 21:59:12'),
(2,7,'Jean Aimable Havyarimana','jeanaimable@leclient.local','0123456789','Problème avec une propriété d\'un propriétaire','Bonjour les gars,\n\nJ’ai repéré un comportement anormal sur le bien “Maison Spring Boot”.  \nLe propriétaire prétend que tout tourne parfaitement, mais d’après les logs, il y a clairement une exception non gérée dans son jardin : un Bean moisi qui infecte tout le contexte d’application.\n\nJe lui ai envoyé plusieurs requêtes HTTP pour clarification, mais il persiste à répondre en 404.  \nFranchement, à ce niveau-là, ce n’est plus du déni, c’est du lazy loading émotionnel.\n\nJe propose qu’on fasse une inspection conjointe du code source (ou du toit), histoire de rétablir la vérité et ajuster le prix de façon transactionnelle.\n\nBien à vous,  \nUn développeur concerné par la propreté du code… et des murs.\n \n\nOn est ensemble.','2025-10-24 18:10:46'),
(3,6,'Nawfal Elkhaznagi','nawfal@leproprio.local','0123456789','Problème avec un client','Bonjour à tous,\n\nJe viens de prendre connaissance de vos remarques concernant ma Maison Spring Boot, et permettez-moi d’être clair : **tout fonctionne parfaitement en local**.\n\nJe ne sais pas ce que vous avez fait dans votre environnement, mais visiblement, votre contexte d’exécution est mal configuré.  \nChez moi, les Beans poussent droit, les dépendances sont parfaitement injectées, et la toiture compile sans la moindre erreur.\n\nQuant à cette soi-disant \"StackOverflowError\" entre la toiture et le chauffage, je préfère parler d’une **optimisation récursive de la chaleur**. C’est un choix architectural assumé, documenté (dans ma tête), et validé après plusieurs sprints de test... en été.\n\nPour le YAML \"fuyant\", je vous rappelle qu’il s’agit d’un **fichier de configuration sensible**. Toute fuite est purement esthétique.  \nEt le bean du chauffe-eau n’est pas défectueux, il est simplement en **lazy initialization** depuis l’hiver dernier.\n\nJe trouve dommage que certains préfèrent lever des exceptions plutôt que de comprendre la logique métier derrière le concept de \"maison intelligente\".  \nMais bon, je suppose que tout le monde n’a pas la même version du JDK... ni le même niveau de patience.\n\nEn résumé :  \n- Aucun bug critique détecté.  \n- Aucune régression depuis la dernière release (mise à jour toiture v2.3.1).  \n- Et surtout : **aucun rollback du prix prévu**.\n\nSi vous voulez faire une inspection, je vous invite à cloner la maison proprement et à relancer le build avec mes variables d’environnement.  \nVous verrez : ça passe crème, sans aucun warning.\n\nCordialement,  \n**Elkhaznagi Nawfal**  \nPropriétaire et Architecte Principal – Maison Spring Boot  \n(P.S. : \"Ce n’est pas un bug, c’est une feature climatique.\")','2025-10-24 18:13:43'),
(5,6,'Nawfal Elkhaznagi','nawfal@leproprio.local','0123456789','Problème avec le staff','Bonjour, \n\nMerci pour votre message et pour votre vigilance... mais permettez-moi une petite remarque amicale : vous passez beaucoup de temps à scruter mes Beans et ma toiture, alors que vos propres variables globales semblent en désordre.  \n\nOui, certains logs montrent des warnings, et oui, ma dépendance “chauffe-eau” est en lazy loading — mais honnêtement, vous devriez peut-être régler vos propres NullPointerExceptions avant de m’accuser de bugs dans ma maison.  \n\nPour rappel : cette maison fonctionne parfaitement en production (chez moi), et Angular ou React dans votre navigateur ne changera rien au fait que le code est stable et que le YAML tient le coup.  \n\nSi vous voulez vraiment visiter, je vous invite à exécuter votre propre build local, à importer correctement les beans, et à revenir avec un contexte d’exécution configuré.  \nSinon, vous risquez juste de confondre un warning esthétique avec un véritable bug architectural.  \n\nCordialement,  \n**Elkhaznagi Nawfal**','2025-10-24 18:24:05'),
(6,8,'Vitor P.','vitor@leclient.local','0123456789','L\'UX est à chier','Bonjour l’équipe,\nJe viens de tester votre application et… oh là là… l’UX est catastrophique.\nLes formulaires sont confus, la navigation est un labyrinthe, et même le footer semble vous regarder en mode passif-agressif.\nAvec quelques ajustements, vos utilisateurs pourraient retrouver le sourire, et vos taux de conversion pourraient exploser.\n\nJe suis sûr que je peux vous aider. J’ai passé des années à jongler avec HTML, CSS et JavaScript, à transformer des interfaces catastrophiques en expériences fluides.\nMais si vous m’embauchez, je suis sûr que cela va changer. Parce que je suis un pro du frontend, le codage et moi ne font qu’un.\n\nAllez... s’il vous plaît.. Offrez-moi cette chance. Je promets de dompter vos menus, vos formulaires et même vos pop-ups rebelles.\nVotre UX n’a jamais été aussi proche d’être sauvée.','2025-10-29 22:51:28'),
(7,9,'Yanis E.','yanis@leclient.local','0123456789','J\'aimerai proposer une section...','C\'est faux ahah. Je vous ai bien eu. Qu\'est-ce qu\'on se marre, n\'est-ce pas?','2025-11-01 22:42:05');
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `doctrine_migration_versions`
--

DROP TABLE IF EXISTS `doctrine_migration_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctrine_migration_versions`
--

LOCK TABLES `doctrine_migration_versions` WRITE;
/*!40000 ALTER TABLE `doctrine_migration_versions` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `doctrine_migration_versions` VALUES
('DoctrineMigrations\\Version20251015201849','2025-10-31 12:30:00',50),
('DoctrineMigrations\\Version20251015212947','2025-10-31 12:30:00',45),
('DoctrineMigrations\\Version20251015232005','2025-10-31 12:30:00',157),
('DoctrineMigrations\\Version20251017190913','2025-10-31 12:30:00',371),
('DoctrineMigrations\\Version20251018192354','2025-10-31 12:30:00',96),
('DoctrineMigrations\\Version20251026123059','2025-10-31 12:30:00',70),
('DoctrineMigrations\\Version20251029230652','2025-10-31 12:30:00',68),
('DoctrineMigrations\\Version20251101002324','2025-10-31 12:30:00',56);
/*!40000 ALTER TABLE `doctrine_migration_versions` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `messenger_messages`
--

DROP TABLE IF EXISTS `messenger_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `messenger_messages` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `body` longtext NOT NULL,
  `headers` longtext NOT NULL,
  `queue_name` varchar(190) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  KEY `IDX_75EA56E016BA31DB` (`delivered_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messenger_messages`
--

LOCK TABLES `messenger_messages` WRITE;
/*!40000 ALTER TABLE `messenger_messages` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `messenger_messages` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` longtext DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `chemin` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `photos` VALUES
(1,NULL,'Photo de l\'utilisateur Mike','/uploads/users/690526227e7f9.png'),
(2,NULL,'Photo de l\'utilisateur Benoit','/uploads/users/69052a5446bab.jpg'),
(3,NULL,NULL,'/uploads/proprietes/69052c5c2824a.jpg'),
(4,NULL,NULL,'/uploads/proprietes/69052c5c28362.jpg'),
(5,NULL,NULL,'/uploads/proprietes/69052c5c40b93.jpg'),
(6,NULL,'Photo de l\'utilisateur Julien','/uploads/users/69052e6318e5a.png'),
(7,NULL,NULL,'/uploads/proprietes/6905309a9fd2d.jpg'),
(8,NULL,NULL,'/uploads/proprietes/6905309a9fd69.jpg'),
(9,NULL,NULL,'/uploads/proprietes/6905309a9fd1e.jpg'),
(10,NULL,NULL,'/uploads/proprietes/6905309aac5ce.jpg'),
(11,NULL,'Photo de l\'utilisateur Nawfal','/uploads/users/6905327abd57e.jpg'),
(12,NULL,NULL,'/uploads/proprietes/6905334c32312.jpg'),
(13,NULL,NULL,'/uploads/proprietes/6905334c3230f.jpg'),
(14,NULL,NULL,'/uploads/proprietes/6905334c3fe87.jpg'),
(15,NULL,NULL,'/uploads/proprietes/6905334c3fe50.jpg'),
(16,NULL,'Photo de l\'utilisateur Jean Aimable','/uploads/users/6905348415af3.jpg'),
(17,NULL,NULL,'/uploads/proprietes/690682ec72476.jpg'),
(18,NULL,NULL,'/uploads/proprietes/690682ec7247b.jpg'),
(19,NULL,NULL,'/uploads/proprietes/690682ec72477.jpg'),
(20,NULL,NULL,'/uploads/proprietes/690682ec7e782.jpg'),
(21,NULL,NULL,'/uploads/proprietes/690682ec7e77b.jpg'),
(22,NULL,NULL,'/uploads/proprietes/690682ec8be56.jpg'),
(23,NULL,NULL,'/uploads/proprietes/69068459eaded.jpg'),
(24,NULL,NULL,'/uploads/proprietes/69068459eaded.jpg'),
(25,NULL,NULL,'/uploads/proprietes/6906845a028ce.jpg'),
(26,NULL,NULL,'/uploads/proprietes/6906845a02979.jpg'),
(27,NULL,NULL,'/uploads/proprietes/690685c37a347.jpg'),
(28,NULL,NULL,'/uploads/proprietes/690685c37a356.jpg'),
(29,NULL,NULL,'/uploads/proprietes/690685c385a1f.jpg'),
(30,NULL,NULL,'/uploads/proprietes/690685c385a1f.jpg'),
(31,NULL,NULL,'/uploads/proprietes/69069c727bb8a.jpg'),
(32,NULL,NULL,'/uploads/proprietes/69069c727bb8c.jpg'),
(33,NULL,NULL,'/uploads/proprietes/69069c7287954.jpg'),
(34,NULL,NULL,'/uploads/proprietes/69069d1fa8e32.jpg'),
(35,NULL,NULL,'/uploads/proprietes/69069d1fa8f46.jpg'),
(36,NULL,NULL,'/uploads/proprietes/69069d1fb4c10.jpg'),
(37,NULL,NULL,'/uploads/proprietes/69069ddec6554.jpg'),
(38,NULL,NULL,'/uploads/proprietes/69069ddec6554.jpg'),
(39,NULL,NULL,'/uploads/proprietes/69069dded20d9.jpg'),
(40,NULL,NULL,'/uploads/proprietes/69069dded20a9.jpg'),
(41,NULL,NULL,'/uploads/proprietes/69069f94001bd.jpg'),
(42,NULL,NULL,'/uploads/proprietes/69069f94002ae.jpg'),
(43,NULL,NULL,'/uploads/proprietes/69069f940c474.jpg'),
(44,NULL,NULL,'/uploads/proprietes/6906a058d0e31.jpg'),
(45,NULL,NULL,'/uploads/proprietes/6906a058d0e64.jpg'),
(46,NULL,NULL,'/uploads/proprietes/6906a058d0eab.jpg'),
(47,NULL,NULL,'/uploads/proprietes/6906a058dc3fe.jpg');
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `proprietes`
--

DROP TABLE IF EXISTS `proprietes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `proprietes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `adresse_id` int(11) NOT NULL,
  `proprietaire_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `prix` double NOT NULL,
  `surface_m2` double NOT NULL,
  `nombre_pieces` int(11) NOT NULL,
  `nombre_chambres` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_727BA5AE4DE7DC5C` (`adresse_id`),
  KEY `IDX_727BA5AE76C50E4A` (`proprietaire_id`),
  CONSTRAINT `FK_727BA5AE4DE7DC5C` FOREIGN KEY (`adresse_id`) REFERENCES `adresses` (`id`),
  CONSTRAINT `FK_727BA5AE76C50E4A` FOREIGN KEY (`proprietaire_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proprietes`
--

LOCK TABLES `proprietes` WRITE;
/*!40000 ALTER TABLE `proprietes` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `proprietes` VALUES
(1,1,4,'maison',749000,142,8,3,'Maison du scrum master','Vous serez accueilli par un open space naturellement propice aux daily meetings : tout le monde s’y croise sans vraiment savoir ce qu’il fait, mais tout le monde prétend que c’est dans la roadmap.\n\nLe salon lumineux, idéal pour vos rétrospectives du dimanche soir, dispose d’un mur entier recouvert de post-it — un véritable backlog mural, prêt à accueillir vos “améliorations continues” (ou vos courses de la semaine).\n\nLa cuisine, en mode Kanban, vous permettra de suivre en temps réel l’avancement de vos repas : “en cours de cuisson”, “en pause café”, “brûlé”. Livrée avec un micro-ondes en version 2.0, qui fait office de sprint review à chaque “ding”.\n\nÀ l’étage, trois chambres spacieuses :\n\nLa première, “Done”, déjà parfaitement rangée (personne n’y dort).\n\nLa deuxième, “In Progress”, pleine de cartons ouverts depuis le déménagement.\n\nEt la dernière, “To Do”, où s’accumule tout ce que vous n’aurez jamais le temps de finir.\n\nLe jardin, quant à lui, est une zone d’expérimentation continue : parfois tondue, parfois laissée en mode “test en production”.\n\nEn bonus : cave aménagée en salle de war room, parfaite pour crier “on est bloqués par l’équipe dev !” sans réveiller les voisins.\n\nBref, une maison où chaque journée est un sprint, chaque repas une rétrospective, et chaque sieste une réunion non planifiée mais hautement prioritaire.','2025-10-31 22:38:36','2025-10-31 22:38:36'),
(2,2,5,'maison',679000,130,7,3,'Maison du Développeur Symfony, prête à être “mise en prod” !','Dès l’entrée, vous serez accueilli par une architecture claire et bien documentée : chaque couloir a sa route, chaque pièce son contrôleur. Impossible de se perdre, sauf si vous touchez au routing.yaml.\n\nLe salon spacieux offre un grand espace ouvert, parfait pour héberger vos sprints ou vos marathons de debug. La cuisine moderne, quant à elle, fonctionne en injection de dépendances : tout est à sa place, tout est réutilisable, et même le lave-vaisselle a ses tests unitaires.\n\nÀ l’étage, trois chambres encapsulées :\n\nune master bedroom stable et élégante,\n\nune dev room pleine de créativité (et de câbles),\n\nune test room un peu instable, mais en constante amélioration.\n\nLa salle de bain, refactorisée récemment, vous propose une expérience RESTful : simple, fluide et bien documentée.\n\nLe jardin, structuré comme une API bien pensée, vous permettra de vous détendre entre deux déploiements. Il dispose d’un garage Git-friendly, parfait pour stocker vos vieux projets et vélos versionnés.\n\nLes + :\n\nConnexion fibre : latence quasi nulle entre canapé et Netflix.\n\nChauffage optimisé, pas de memory leak thermique.\n\nSystème d’arrosage codé en YAML (fonctionne 8 fois sur 10, selon la météo).\n\nMaison full responsive : s’adapte aussi bien à la vie de couple qu’au mode “solo en remote”.\n\nLivrée avec logs de maintenance clairs et commit message du précédent propriétaire.\n\nCoup de cœur garanti pour tout développeur aimant la structure, la propreté du code et les commits sans conflits.\nUne maison “Symfony ready” où il ne reste plus qu’à composer install vos valises.','2025-10-31 22:56:42','2025-10-31 22:57:54'),
(3,3,6,'Maison individuelle',735000,140,6,3,'Maison Spring Boot – la résidence qui démarre plus vite que ton application en local','À vendre : superbe maison construite sur une architecture solide, entièrement développée en Java pur, propulsée par un moteur Spring Boot ultra-performant.\nChaque pièce a été soigneusement injectionnée avec confort, logique et quelques beans décoratifs.\n\nDès l’entrée, vous serez accueilli par un hall d’initialisation rapide, parfait pour charger vos dépendances essentielles (clés, chaussures et café).\n\nLe salon, vaste et lumineux, est configuré en mode singleton : tout le monde s’y retrouve, mais une seule instance à la fois. La cuisine, quant à elle, fonctionne en auto-wiring : les ustensiles se branchent tout seuls (en théorie) et le frigo se recharge automatiquement… sauf quand le garbage collector passe.\n\nÀ l’étage, vous trouverez trois chambres :\n\nUne master suite en mode “production”, stable, optimisée et bien commentée.\n\nUne chambre dev, pleine de brouillons, de tests et de logs de vie quotidienne.\n\nUne chambre staging, qu’on promet toujours de ranger “avant le prochain sprint”.\n\nLa salle de bain RESTful, sobre et efficace, propose un service GET pour l’eau chaude et un POST pour la mousse.\n\nÀ l’extérieur, un jardin modulaire, où chaque plante est un bean géré par le contexte de la nature. Vous y trouverez aussi un garage Dockerisé, capable de contenir jusqu’à deux véhicules et un serveur local.','2025-10-31 23:08:12','2025-11-01 22:48:53'),
(4,4,10,'Chateaux',1850000,495,16,6,'Chateau à vendre','Château rénové de manière unique avec un jardin spacieux et de belles finitions à Turnhout\n\nEntrez dans un morceau d\'histoire avec tout le confort moderne. Ce château magnifiquement rénové, situé au 130 Steenweg op Gierle à Turnhout, offre une expérience de vie exceptionnelle à ceux qui recherchent l\'espace, le charme et le luxe. Avec pas moins de 6 chambres, 3 salles de bains et une gamme impressionnante d\'équipements, cette propriété est un véritable joyau sur le marché immobilier.\n\nSituation :\nSitué à la périphérie de Turnhout, à proximité de la N12 et de l\'E34, ce château bénéficie d\'une connexion facile vers Anvers, les Pays-Bas et les communes environnantes. En même temps, le terrain offre beaucoup d\'intimité, de tranquillité et un jardin ensoleillé qui vous fait oublier que vous êtes si près de la ville. Les écoles, les magasins et les loisirs sont à proximité.\n\nSupplémentaire :\n- Terrain à bâtir adjacent en option\n- Jardin ensoleillé, entièrement aménagé, avec plusieurs terrasses\n- Diverses dépendances, dont une avec un four à pizza authentique\n- Rénovation de haute qualité préservant le charme historique\n\n* Les surfaces/dimensions indiquées sont données à titre indicatif. Surface conforme à l\'EPC.\n* Renseignements urbanistiques en cours. Gmo en cours. Pour plus d\'informations, consultez rapidement www.xxxxx.be. Vous souhaitez obtenir une ESTIMATION GRATUITE de votre propriété ? Appelez le 0123456789.','2025-10-31 23:00:12','2025-10-31 23:00:12'),
(5,5,10,'Villa',1025000,405,8,3,'Villa à vendre','Désolé il n\'y a pas de traduction française. Hoogwaardig afgewerkte nieuwbouw woning met aangelegde tuin in landelijke omgeving op 1052 m²\n\nWelkom in deze uitzonderlijk afgewerkte nieuwbouwwoning (bouwjaar 2024), gelegen aan de Eelstraat 5A in Ravels. Deze instapklare woning combineert hoogwaardige materialen, een doordachte indeling en moderne technologieën. Met een perceel van maar liefst 1052 m², een volledige kelderverdieping en een luxueus interieur is dit de ideale thuis voor wie op zoek is naar comfort en kwaliteit.\n\nLocatie:\nDe woning is rustig en landelijk gelegen in Ravels, een groene gemeente in de Antwerpse Kempen. Geniet van de serene omgeving met weidse zichten, terwijl u toch vlot verbinding heeft met omliggende gemeenten en steden. Winkels, scholen en recreatiemogelijkheden bevinden zich op korte afstand. De Eelstraat biedt een perfecte balans tussen rust en bereikbaarheid.\n\nBijzonderheden:\n- Hoogwaardige materialen, maatwerk en indirecte verlichting in de hele woning\n- Volledig onderkelderd\n- Uiterst energiezuinig (EPC label A+)\n- 40 Zonnepanelen + thuisbatterij\n- Geothermische warmtepomp\n- Regenput 10.000 L\n- Domotica\n- Alarm\n- Automatische verlichting in de tuin\n- Zonnescreens\n\n* Vermelde oppervlakten/afmetingen zij indicatief. Oppervlakte conform plannen.\n* Stedenbouwkundige inlichtingen in aanvraag. Gmo in aanvraag. Voor meer informatie, kijk snel op www.heylenvastgoed.be. Inte','2025-10-31 23:06:17','2025-10-31 23:06:17'),
(6,6,10,'appartement',1600,120,7,2,'Loft à louer','Forest - Guillaume Van Haelen - Bertholot / Loft 2 chambres avec terrasse et jardinet.\nIl se compose d\'un hall d\'entrée avec wc et vestiaire, un séjour/salle à manger avec cuisine ouverte, un jardinet accessible depuis le séjour / cuisine, d\'une grande chambre et une salle de douche. Une cloison pourra être créee pour délimiter une deuxième chambre qui se situera entre le jardinet et la première chambre. PEB C, 125 kWhEP/m²/an, 25 kgCO²/m²/an, 20251024-0000732007-01-2\nChaudière individuelle au gaz, double vitrage, parquet, thermostat... Les charges de 150€ comprennent l\'entretien des communs et jardins. Places de parking intérieures 120€/mois / unité.\nSitué entre le Parc de Forest et le Wiels, la localisation vous offrira un accès facile à toutes les commodités du quartier (transport publics, partagés, espaces verts, restaurants commerces, ...)','2025-10-31 23:12:19','2025-10-31 23:12:19'),
(7,7,11,'kot',380,100,3,1,'CHAMBRE ÉTUDIANT - GRIMARD n° 02','ATTENTION ! UNIQUEMENT POUR ÉTUDIANTS OU JEUNES TRAVAILLEURS !!!! Une chambre d\'étudiant meublée (+/- 13m²) située dans une spacieuse et lumineuse maison entièrement remise à neuf composée de 4 chambres uniquement pour étudiants.\nSITUATION : MONTIGNIES/S/SAMBRE - Proche de la HELHa, Condorcet -Bus à proximité - Proches de tous les commerces (Supermarché, piscine – Stade Yernaux, Cora Châtelineau...).\nCOMMUNS : Profitez des espaces communs avec vos colocs, composé d\'un salon, une lumineuse salle à manger, une cuisine équipée. Profitez des extérieurs - une cour et un jardin.\nLes lessives ? Une machine à laver est mise à votre disposition dans la salle-de-douche du rez-de-chaussée. Les poubelles ? Une remise est prévue à cet effet comme local poubelle.\nPRIVE : une chambre meublée avec salle-de-douche à partager à 2.\nLOYER : 380,-€.\nCAUTION : 2 mois de loyer bloquée chez Korfine.\nFORFAIT CHARGES : 110,-€ - WIFI/TV, électricité, gaz, eau, nettoyage des communs.\nQuote-part état des lieux d\'entrée et de sortie : à prévoir.\nDisponible le 01.09.2025 !\nBail : 1 AN RENOUVELABLE.\nIL EST POSSIBLE D\'INSCRIRE SON DOMICILE DANS LE BIEN.\n📣 Intéressé(e) par cette location ?\n📄 Téléchargez la fiche de candidature sur www.kimmo.immo, complétez-la soigneusement et envoyez-la à info@kimmo.immo ou déposez-la directement à l’agence 🏢\n⏳ Après réception de votre dossier, nous vous recontacterons dans les 48h\n📞 Une question ou besoin de précision avant de finaliser votre démarche ?','2025-11-01 10:49:06','2025-11-01 10:49:06'),
(8,8,11,'kot',295,100,2,1,'CHAMBRE ÉTUDIANT - LEON BERNUS n° 08','Chambre meublée pour étudiant, avec salle de douche à partager (à 2), située dans une maison de maître rénovée avec goût, comprenant 10 chambres réservées aux étudiants.\nCharleroi – Ville Haute, à deux pas de l’UT, Condorcet, Helha. Transports (métro/bus) à 200 m, commerces à proximité.\nEspaces communs : salon cosy avec Netflix, grande cuisine full-équipée, salle à manger lumineuse, terrasse ensoleillée, buanderie au sous-sol.\nMénage des communs inclus, possibilité d’ajouter le nettoyage de ta chambre.\nBuanderie équipée à disposition.\nLoyer : 295 €/mois\nCaution : 2 mois de loyer\nFORFAIT Charges : 100 €/mois (eau, chauffage, électricité, internet, Netflix, assurance, entretien des communs)\nPromo été :\n→ 2 mois de charges offerts si contrat signé en juillet 2025\n→ 1 mois offert si signé en août 2025\nDisponible dès le 01.09.2025\nBail d’un an (01.09.2025 au 31.08.2026), renouvelable.\nRéservé aux étudiants (attestation scolaire obligatoire).\n‍‍ Signature avec un garant ayant des revenus.\nIL N’EST PAS POSSIBLE D’INSCRIRE SON DOMICILE DANS LE BIEN.\n📣 Intéressé(e) par cette location ?\n📄 Téléchargez la fiche de candidature sur www.kimmo.immo, complétez-la soigneusement et envoyez-la à info@kimmo.immo ou déposez-la directement à l’agence 🏢\n⏳ Après réception de votre dossier, nous vous recontacterons dans les 48h\n📞 Une question ou besoin de précision avant de finaliser votre démarche ? Contactez-nous au 071 77 28 38\n✅ Un dossier complet et sérieux augmente vos chances','2025-11-01 10:51:59','2025-11-01 10:51:59'),
(9,9,11,'appartement',900,90,4,2,'Appartement de standing avec terrasse et garage à Marche','Rendez-vous uniquement sur www.honesty.be via la page du bien (pas de rendez-vous par téléphone)\n\nHonesty vous propose cet appartement lumineux au 4ème et dernier étage d\'une résidence de standing. Il se compose d\'un hall d\'entrée, d\'un WC, d\'un séjour spacieux avec nouvelle cuisine équipée et îlot central, d\'une chambre avec salle de douche attenante, d\'une 2ème chambre avec salle de bains attenante. Vous serez séduit par la baie vitrée sur toute la longueur du séjour, sa grande terrasse, ses balcons filants des 2 côtés. Vous profitez ainsi au maximum de l\'environnement calme et arboré. Il est complété par un garage au sous sous-sol et une cave. Une pépite!\nLibre de suite. Loyer de 900€ + provision de 120€ pour les communs, l\'eau froide et l\'assurance incendie. PEB:D. Frais d\'état des lieux : 150€','2025-11-01 10:55:10','2025-11-01 10:55:10'),
(10,10,12,'Villa',5650000,449,18,4,'Magere Schorre','À la lisière du prestigieux Zoute, à proximité du Royal Zoute Golf Club, un projet exceptionnel comprenant 9 villas exclusives est en cours de réalisation. Les terrains, d\'une superficie comprise entre 850 et 950 m², offrent une occasion rare d\'acquérir un terrain à bâtir dans ce lieu emblématique au Zoute. Ces villas uniques sont toutes conçues par des architectes de renom\ntels que Piet Bailyu, Vincent Holvoet, Archi2000 et EL Architects. La garantie que chaque maison sera une création unique, en parfaite harmonie avec la grandeur des environs.\n\nL\'architecture reflète le style typique du Zoute, avec ses toits rouge orangé chaleureux et ses façades blanc cassé. Pourtant, chaque villa a son propre caractère unique grâce à la vision des différents architectes de renom. Ici, vous trouverez un équilibre entre calme, nature et luxe, avec la détente à portée de main.\n\nLe Magere Schorre est synonyme de luxe et de qualité de vie inégalés. Les architectes d\'intérieur Bryan Chielens et Charlotte Vercruysse veillent à ce que votre villa soit le reflet raffiné de votre style de vie personnel. Il ne s\'agit pas seulement de luxe matériel : nous créons un cadre de vie où le calme, le confort et le bien-être occupent une place centrale.\n\n','2025-11-01 11:02:27','2025-11-01 11:02:27'),
(11,11,12,'Villa',3140000,464,15,4,'The Nati','STEREA PARK, propose encore 6 nouvelles villas 4 chambres, lumineuses et très luxueuses, de 464 à 492 m², toutes avec terrasses et jardin privatif. L’emplacement des villas est le plus privilégié du projet avec une vue immédiate sur le Golf mais à parfaite distance pour préserver une agréable intimité, assurée par les plans d’eau au bout de votre jardin.\nLe projet lové dans la nature a été conçu pour assurer un habitat hors pair à l’architecture sobre et intemporelle, qui se fond magnifiquement dans cet environnement verdoyant et d\'une sérénité absolue. Les finitions sont haut de gamme, qualitatives et soignées. Le confort \"chaleur idéale\" tout au long des saisons sera assuré par la nouvelle technologie de géothermie. Le domaine qui s’étend sur 80 ha, se situe à l’Est de Bruxelles du côté de Wezembeek Oppem, proche du Parc de Tervueren et des écoles internationales. Vous pourrez bénéficier du Club du Golf « The National » et du club de fitness David Lloyd. Des commerces et restaurants complèteront cet ensemble pour assurer bien-être et confort individuel et collectif adapté au mode de vie familial actuel. Une visite est indispensable pour vivre le projet.\nPour tout renseignement, contactez-nous au 02/375 1010 / new@victoire.be. Vente sous droits d\'enregistrement sur le terrain et sous régime TVA sur la construction','2025-11-01 11:05:44','2025-11-01 11:05:44');
/*!40000 ALTER TABLE `proprietes` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `proprietes_photos`
--

DROP TABLE IF EXISTS `proprietes_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `proprietes_photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `propriete_id` int(11) DEFAULT NULL,
  `photo_id` int(11) NOT NULL,
  `principale` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `IDX_E03496FD18566CAF` (`propriete_id`),
  KEY `IDX_E03496FD7E9E4C8C` (`photo_id`),
  CONSTRAINT `FK_E03496FD18566CAF` FOREIGN KEY (`propriete_id`) REFERENCES `proprietes` (`id`),
  CONSTRAINT `FK_E03496FD7E9E4C8C` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proprietes_photos`
--

LOCK TABLES `proprietes_photos` WRITE;
/*!40000 ALTER TABLE `proprietes_photos` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `proprietes_photos` VALUES
(1,1,3,0),
(2,1,4,0),
(3,1,5,0),
(4,2,7,0),
(5,2,9,0),
(6,2,8,0),
(7,2,10,0),
(8,3,12,0),
(9,3,13,0),
(10,3,14,0),
(11,3,15,0),
(12,4,18,0),
(13,4,19,0),
(14,4,17,0),
(15,4,20,0),
(16,4,21,0),
(17,4,22,0),
(18,5,23,0),
(19,5,24,0),
(20,5,25,0),
(21,5,26,0),
(22,6,28,0),
(23,6,27,0),
(24,6,29,0),
(25,6,30,0),
(26,7,32,0),
(27,7,31,0),
(28,7,33,0),
(29,8,34,0),
(30,8,35,0),
(31,8,36,0),
(32,9,37,0),
(33,9,38,0),
(34,9,40,0),
(35,9,39,0),
(36,10,41,0),
(37,10,42,0),
(38,10,43,0),
(39,11,44,0),
(40,11,46,0),
(41,11,45,0),
(42,11,47,0);
/*!40000 ALTER TABLE `proprietes_photos` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `reset_password_request`
--

DROP TABLE IF EXISTS `reset_password_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `reset_password_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `selector` varchar(20) NOT NULL,
  `hashed_token` varchar(100) NOT NULL,
  `requested_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `expires_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  PRIMARY KEY (`id`),
  KEY `IDX_7CE748AA76ED395` (`user_id`),
  CONSTRAINT `FK_7CE748AA76ED395` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset_password_request`
--

LOCK TABLES `reset_password_request` WRITE;
/*!40000 ALTER TABLE `reset_password_request` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `reset_password_request` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '(DC2Type:json)' CHECK (json_valid(`roles`)),
  `password` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `updated_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `is_verified` tinyint(1) NOT NULL,
  `photo_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`),
  UNIQUE KEY `UNIQ_1483A5E97E9E4C8C` (`photo_id`),
  CONSTRAINT `FK_1483A5E97E9E4C8C` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `users` VALUES
(3,'mike@immauweb.local','[\"ROLE_ADMIN\"]','$2y$13$Uox2zFK102G03g9aBoVHQORBoYrg2TmSEhZoevJsW7Zrwfwk.NF9O','Mike Salvatore','Schirinzi','0123456789','2025-10-16 15:18:53','2025-11-01 15:23:58',1,1),
(4,'blepage@proprio.local','[\"ROLE_CLIENT\",\"ROLE_PROPRIETAIRE\"]','$2y$13$oiDl84bCsYXIOJjCTQeKrO2iIbyXeNLaCiz9CtZfMKorF/8FdQlNm','Benoit','Lepage','0123456789','2025-10-16 15:20:36','2025-10-16 15:20:36',1,2),
(5,'jdunia@lepropio.local','[\"ROLE_CLIENT\",\"ROLE_PROPRIETAIRE\"]','$2y$13$v1GSVkbv/8vxNWRAtaAHveHt6bN3dZJIVEGrej/ypzgcl.urErtRi','Julien','Dunia','0123456789','2025-10-16 16:47:14','2025-11-01 16:15:06',1,6),
(6,'nawfal@leproprio.local','[\"ROLE_CLIENT\",\"ROLE_PROPRIETAIRE\"]','$2y$13$aDwO4jiJkwzurM7acQkq.u38ck1cQEPGfb9lMHRB/RFZ0etfI.TZq','Nawfal','Elkhaznagi','0123456789','2025-10-17 14:04:42','2025-10-19 14:04:42',1,11),
(7,'jeanaimable@leclient.local','[\"ROLE_CLIENT\"]','$2y$13$WbETtsI/zlTNrCnRrC/NN./5GcC4.IKO4EMMX/T5rO5mX.nMdV4L.','Jean Aimable','Havyarimana','0123456789','2025-10-17 10:00:25','2025-10-17 10:00:25',1,16),
(8,'vitor@leclient.local','[\"ROLE_CLIENT\"]','$2y$13$a.MzbgpSxWYKwZb8ZxbP2.aYYWPriHvRgad1/k4LmWftJFvsazjmS','Vitor','P.','0123456789','2025-10-28 14:42:11','2025-10-28 14:42:11',1,NULL),
(9,'yanis@leclient.local','[\"ROLE_CLIENT\"]','$2y$13$CXh42DjX2dVBQinertVle.rGUXFY6DWTv.SQ/eKs/nHc6h4eykLxu','Yanis','E.','0123456789','2025-10-28 14:50:53','2025-11-01 16:03:58',1,NULL),
(10,'leriche@leproprio.local','[\"ROLE_CLIENT\",\"ROLE_PROPRIETAIRE\"]','$2y$13$UTbAxXguCGChLObwJ51a5O6bdrdAA..yKwjNbbkspwzwusEqrapAm','Stéphane','Le Riche','0123456789','2025-11-01 22:54:49','2025-10-31 23:00:12',1,NULL),
(11,'lepauvre@leproprio.local','[\"ROLE_CLIENT\",\"ROLE_PROPRIETAIRE\"]','$2y$13$RKGBjqFP2KT0AEcKwZDEdePPqNY9QL953yQhXkM41xq5WTsyZkVLm','Bernard','Le Pauvre','0123456789','2025-11-01 00:46:22','2025-11-01 10:49:06',1,NULL),
(12,'lebaron@belge.local','[\"ROLE_CLIENT\",\"ROLE_PROPRIETAIRE\"]','$2y$13$1lDffsBt55oPMDEhRG1RQOLPD5kAzWiECl4GENYn9EKkpf4La115e','Colruyt ','Jef','0123456789','2025-11-01 00:57:50','2025-11-01 11:02:28',1,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
commit;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2025-11-01  23:00:00
