# Exercice 4

## Instruction

Comptez le nombre de mots entrés par l'utilisateur depuis la console.
La commande `fin` permet de quitter la lecture au clavier.

## Réflexions

Bon bah, ça c'est facile maintenant. C'est le même exercice que l'exercice
précédent, sauf que je dois avoir un compteur au lieu de sauvegarder les mots.

## Mes étapes

1. Je crée une variable `$total_user_words` à laquelle je lui attribue un entier
   (`int`) 0.

2. Je crée une variable `$is_running` à laquelle je lui attribue une valeur
   booléenne `true`. 

3. Je crée une boucle "TANT QUE" `while` avec comme condition `$is_running`.

   1. J'invite l'utilisateur à entrer un nouveau mot, si ce mot est invalide, je
      lui demande de recommencer.

   2. Je vérifie que le mot entré correspond au mot `fin`:

      1. Si c'est le cas, la boucle s'arrête et on passe au point 4.

      2. Sinon j'incrémente le total des mots entrés par l'utilisateur. Et la
         boucle recommence...

4. J'affiche avec la fonction `echo` le compteur des mots entrés.
