# Calculatrice simple

Exercice calculatrice simple, sur la base de connaissances que nous avons vu en cours.

## Réflexions

Je dois trouver un moyen de :

1. Déclencher un événement au clic sans utiliser le DOM.

2. Récupérer les entrées utilisateurs.

    1. Je dois récupérer l'opérande de gauche.s
    2. Je dois récupérer l'opérateur arithmétique.
    3. Je dois récupérer l'opérande de droite.

3. Valider les entrées utilisateurs.

    Je dois faire en sorte que les opérandes sont des nombres entiers ou décimaux ET que l'opérateur correspond à un des
    symboles arithmétiques suivants : `*`, `/`, `+`, `-`.

4. Calculer l'opération.

5. Gérer les cas d'erreurs.

6. Afficher le résultat.

## Plan d'attaque

1. Pour répondre au besoin n°1, on a vu dans les cours que nous pouvons utiliser l'attribut `onclick` sur les éléments
   boutons.

    **NOTE**: Nous n'avons pas encore vu l'objet DOM avec les listeners.

2. Pour répondre au besoin n°2, on a vu dans les cours que pour récupérer une entrée utilisateur, on peut utiliser la
   fonction native [`prompt`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt) du navigateur.

    - **BONUS**: Redemander à l'utilisateur d'entrer un nombre s'il entre autre chose
      qu'un nombre (`do while`).

    - **BONUS**: Gérer le cas d'annulation du retour de `prompt` (valeur `null`).

3. Pour répondre au besoin n°3, pour valider les données, je dois passer par des conditions.

    Convertir les chaines en nombre entiers ou décimaux, je peux utiliser
    [`Number.parseFloat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat).

    **NOTE**: Nous voulons être strict sur la conversion. Ne pas utiliser `Number` car il s'agit d'une
    [`conversion numérique`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number#number_coercion)
    non strict.

    Pour les opérateurs, une simple condition suffit.

4. Pour répondre au besoin n°4, c'est un parfait cas pour utiliser les switch case et les fonctions fléchées.

5. Pour répondre au besoin n°5, nous n'avons pas encore vu comment gérer correctement les cas d'erreurs. Ceci dit, cela
   ne nous empêche pas de retourner une chaîne de caractères décrivant notre erreur pour le moment.

    - Erreur opérandes incorrectes
    - Erreur mauvais opérateur
    - Erreur de division par 0
