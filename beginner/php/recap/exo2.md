# Exercice 2

## Instruction

Affichez les prénoms les-uns en dessous des autres avec une boucle.

## Réflexion

Mon premier besoin est de réfléchir à comment je peux utiliser des variables
individuelles dans une boucle.

Mon second besoin est de trouver le meilleur moyen de parcourir ces données.

Mon troisième besoin est de trouver un moyen d'afficher ces données.

## Plan d'attaque

Je me dis que placer ces variables définies individuellement dans un tableau est
le meilleur moyen pour pouvoir les parcourir. On a appris qu'il existe plusieurs
façons de parcourir un tableau de manière précise étant donnée que l'on connaît
la taille de mon tableau via la fonction
[`sizeof`](https://www.php.net/manual/fr/function.sizeof.php) ou
[`count`](https://www.php.net/manual/fr/function.count.php).

Les boucles qui se présentent à moi sont donc :

1. La boucle "POUR": `for`
2. La boucle "POUR CHAQUE": `foreach`

Il me reste à choisir parmi celles-ci. Je n'ai pas besoin de faire des choses
très compliquées avec ce tableau alors je décide d'utiliser `foreach` car elle
remplie parfaitement mon besoin, en plus d'être plus simple et plus claire.

Afficher les données c'est quelque que je sais déjà faire, alors let's go !

## Mes étapes

1. J'ai réutilisé les variables individuelles des utilisateurs que nous avions
   utilisées pour réaliser le 1er exercice et je les ai mis dans un tableau
   s'appellant `$users`.

2. Je crée la boucle `foreach` en récupérant uniquement la valeur du tableau.

3. J'affiche l'utilisateur en cours d'itération avec la fonction
   [`echo`](https://www.php.net/manual/fr/function.echo.php) suivi d'un saut à
   la ligne.
