# Exercice 3

## Instruction

Vérifiez que le nombre entré par l'utilisateur depuis la console soit bien une
valeur numérique pair ou impair.

## Réflexion

Mon premier besoin est de trouver un moyen de récupérer une entrée depuis la
console du terminal.

Mon second besoin est de réfléchir à comment je peux couper court à un programme
si l'entrée ne correspond pas aux exigences de l'énoncé.

Mon troisième besoin est de trouver la formule arithmétique permettant de savoir
si un nombre est pair ou impair.

## Plan d'attaque

On a vu que l'on pouvait utiliser la fonction
[`readline`](https://www.php.net/manual/fr/function.readline.php) pour inviter
l'utilisateur à entrer des données dans notre programme.

Je n'ai pas encore vu comment couper-court à un programme, mais je suis
quelqu'un de curieux, je fais donc une recherche sur mon moteur de recherche
préféré sur comment je peux faire cela. Je tombe pile poil sur une fonction
trouvée sur la documentation de PHP.net. Cette fonction est
[`exit`](https://www.php.net/manual/fr/function.exit.php). Parfait, je peux
commencer !

## Mes étapes

1. J'invite l'utilisateur à entrer un nombre avec la fonction
   [`readline`](https://www.php.net/manual/fr/function.readline.php) que je
   sauvegarde dans une variable la nommant `$maybe_user_number`.

2. Je vérifie que l'entrée correspond bien à une valeur numérique via la
   fonction [`is_numeric`](https://www.php.net/manual/fr/function.is-numeric.php).

   1. Si ça n'est pas le cas, je quitte le programme avec la fonction
      [`exit`](https://www.php.net/manual/fr/function.exit.php) et un texte.

   2. Si c'est le cas, on passe au point 3.

3. Je crée une variable s'appellant `$user_number` dans laquelle j'attribue en
   valeur la conversion de l'entrée en un type entier (`int`), parce que sinon
   la valeur reste une chaîne de caractères (`string`) et ce n'est pas ce que
   nous voulons pour la suite.

4. Je vérifie ensuite si l'entrée au format entier est pair via la formule
   arithmétique adéquate (`$user_number % 2 === 0`) et j'affiche un message
   différent en fonction du retour de cette évaluation (un valeur booléenne
   `bool` aka vraie ou fausse).
