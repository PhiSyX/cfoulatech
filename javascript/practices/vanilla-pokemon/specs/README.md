https://www.youtube.com/watch?v=qrXag3cs-8s&list=PL94098664516B2EAA&index=49

🧪 Exercice : Crée ton mini-jeu de combat Pokémon en HTML, CSS et JavaScript
🎯 Objectif


Créer un mini-jeu de combat Pokémon en HTML/CSS/JavaScript pur avec DOM (sans framework), où le joueur pourra :

Choisir un Pokémon parmi une liste de 3.

Utiliser 4 attaques différentes.

Voir les sprites des Pokémon et leurs points de vie (HP) en temps réel.

Gérer un système de tour par tour, où le Pokémon adverse attaque automatiquement après le joueur.

Voir l’impact des attaques (efficace, peu efficace, sans effet).

Afficher des barres de vie dynamiques et des messages de combat.

Déclarer un vainqueur ou un Pokémon KO.



🧰 Compétences mobilisées
Manipulation du DOM en JavaScript

Événements (click)

Création et modification d’éléments HTML en JS

Gestion de tableaux et objets

Mise à jour dynamique de l’affichage

Logique de conditions et d’effets

Manipulation de styles CSS en JS




🔧 Instructions
Créer une page d’accueil pour pouvoir lancer le jeu avec un bouton.

moves (tableau de 4 attaques, avec leur nom, type, puissance, précision)

Créer une liste de 3 Pokémon (ex. : Dracaufeu, Tortank, Florizarre), chacun avec 4 attaques.

Créer une interface HTML :

Une zone de sélection de Pokémon (affichage des noms cliquables)

Deux zones d’affichage (Joueur et Ennemi) : sprite + HP + barre de vie

4 boutons d’attaque dynamiques

Une zone de commentaires (messages : "C’était super efficace !", etc.)

Quand un joueur choisit son Pokémon :

Son sprite, ses HP et ses attaques s’affichent.

Un Pokémon adverse aléatoire est généré.

Le combat commence.

Quand le joueur clique sur une attaque :

Le jeu vérifie si l'attaque touche (précision).

Calcule les dégâts, applique les bonus/malus de type.

Met à jour les HP et la barre de vie.

Affiche un message (attaque réussie, ratée, efficace, etc.).

L’adversaire réplique avec une attaque aléatoire après un court délai.

Quand un Pokémon a 0 HP ou moins :

Affiche "KO", termine la partie avec un message de victoire/défaite.




💡 Bonus facultatifs
Ajouter des sons (attaque, KO, clic).

Ajouter des animations CSS (attaque, perte de vie).

Ajouter d'autres Pokémon ou types.

