# Exercice 4

## Instruction

Afficher les mots entrés par l'utilisateur depuis la console et les afficher.
La commande `quitter` permet de quitter la lecture au clavier.

## Réflexions

Inviter l'utilisateur à envoyer quelque chose à notre programme, on l'a vu dans
l'exercice précédent, c'est super. Le problème est que je dois inviter
l'utilisateur à envoyer potentiellement plusieurs mots. Comment puis-je faire
cela ? Mmh, il me faut une boucle, c'est sûr! Étant donnée que je n'ai rien de
précis sur quoi parcourir, je pense que la meilleur boucle qui se présente à moi
est la boucle "TANT QUE" `while`. Mais tant que quoi? C'est une question à
laquelle je dois réfléchir en profondeur, c'est l'un de mes besoins.

## Plan d'attaque

Après mûr réflexion, je décide d'utiliser la boucle `while` avec comme condition
`true` par défaut et quand l'utilisateur tape le mot `quitter`, et bien je
change cette valeur par `false`, cela me semble correcte. Ensuite je n'ai plus
qu'à ajouter le mot entré dans un tableau, et afficher le tableau dans une
nouvelle boucle plus adéquate et le tour est joué.

## Mes étapes

1. Je crée une variable `$user_words` à laquelle je lui attribue un tableau vide.
   Cette variable va contenir tous les mots entrés par l'utilisateur.

2. Je crée une variable `$is_running` à laquelle je lui attribue une valeur
   booléenne `true`. 

3. Je crée une boucle "TANT QUE" `while` avec comme condition `$is_running`.

   1. J'invite l'utilisateur à entrer un nouveau mot, si ce mot est invalide, je
      lui demande de recommencer.

   2. Je vérifie que le mot entré correspond au mot `quitter`:

      1. Si c'est le cas, la boucle s'arrête et on passe au point 4.

      2. Sinon j'ajoute le mot à la liste des mots. Et la boucle recommence...

4. Je parcours le tableau des mots via une boucle `foreach` et je l'affiche avec 
   la fonction `echo`.
