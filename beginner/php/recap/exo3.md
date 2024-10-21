# Exercice 3

## Instruction

Vérifier que le nombre entré par l'utilisateur depuis le terminal soit bien une
valeur numérique pair ou impair.

## Exemple des données

| nombre (readline) |
| ----------------- |
| 3                 |
| 10                |
| "Hello World"     |

## Sortie attendue

| nombre        | pair | erreur |
| ------------- | ---- | ------ |
| 3             | non  | non    |
| 10            | oui  | non    |
| "Hello World" | non  | oui    |

**erreur** :

> Vous n'avez pas introduit un nombre valide.

En fonction du résultat de la comparaison du reste de la division par 2

**oui** :

> Le nombre que vous avez entré est pair

**non** :

> Le nombre que vous avez entré est impair

## Réflexion

Mon premier besoin est de trouver un moyen de récupérer une entrée depuis la
console du terminal. On a vu comment on pouvait récupérer une entrée utilisateur
via la fonction
[`readline`](https://www.php.net/manual/fr/function.readline.php). On a
également vu comment on pouvait convertir cette entrée via une conversion
explicite d'une chaîne en entier
[`(int)`](https://www.php.net/manual/fr/language.types.integer.php#language.types.integer.casting).

Mon second besoin est de réfléchir à comment je peux couper court à un programme
si l'entrée ne correspond pas aux exigences de l'énoncé. D'après les recherches
sur internet, on est tombé sur la fonction
[`exit`](https://www.php.net/manual/fr/function.exit.php) pour terminer la
script courant.

Mon troisième besoin est de trouver la formule arithmétique permettant de savoir
si un nombre est pair ou impair. On a vu les [opérateurs arithmétiques](https://www.php.net/manual/fr/language.operators.arithmetic.php)
qui nous permettent entre autres d'avoir le reste d'une division via le modulo (`%`).

## Plan d'action

Lorsque l'utilisateur entre le nombre `<nombre>` en chaîne de caractère  
Alors je converti cette chaîne en entier  
S'il n'est pas possible de convertir  
Alors je retourne une erreur provoquant l'arrêt du programme avec le message `<message attendu>`  
Sinon je vérifie que le nombre converti `<nombre>` soit bien pair  
Et j'affiche le message de sortie attendu `<message attendu>` en fonction du résultat de la comparaison
