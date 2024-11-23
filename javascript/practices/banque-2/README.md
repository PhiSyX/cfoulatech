# Exercice JavaScript sur le DOM

## Instruction

Inviter l'utilisateur à déposer ou retirer de l'argent dans un champ input et refléter les changements du solde dans le
document.

Créer deux boutons:

1. Déposer, qui ajoute de l'argent d'un solde total
2. Retirer, qui retire de l'argent d'un solde total

Créer un affichage dans lequel le solde total est modifié à chaque fois que l'on appuie sur l'un des boutons.

**BONUS**: Afficher les erreurs dans le rendu HTML.

## Exemple des données

| argent / solde de base |
| ---------------------- |
| 100                    |

| action (button) | montant (input) | solde (output) | erreur attendu                                  |
| --------------- | --------------- | -------------- | ----------------------------------------------- |
| Déposer         |                 | 100            | "Il ne s'agit pas d'un nombre, recommencez..."  |
| Déposer         | 0               | 100            | "Veuillez entrer un montant d'au moins 0.5€"    |
| Déposer         | 10              | 110            |                                                 |
| Déposer         | 40              | 150            |                                                 |
| Retirer         | 35              | 115            |                                                 |
| Retirer         | 120             | 115            | "Le solde actuel du compte est de 115€."        |
| ^^^^^^^         | ^^^             | ^^^            | "Il vous manque 5€ pour retirer 120€."          |
| ^^^^^^^         | ^^^             | ^^^            | "Veuillez ajouter de l'argent à votre compte !" |

## Réflexion

On a vu comment on pouvait récupérer un élément HTML avec les différentes méthodes du DOM.

1.  `getElementById`

    L'argument DOIT être un ID existant de l'attribut `id` d'un élément HTML. Si cet ID n'existe pas dans l'arbre DOM,
    le résultat de cet méthode nous renvoie `null`.

2.  `getElementsByNames`

    L'argument DOIT être un nom existant de l'attribut `name` d'un élément de formulaire HTML. Si ce nom n'existe pas
    dans l'arbre DOM, le résultat de cet méthode nous renvoie `null`.

3.  `getElementsByClassName`

    L'argument DOIT être un nom de classe existant de les attributs `class` d'un ou plusieurs éléments HTML. Si ce nom
    n'existe pas dans l'arbre DOM, le résultat de cet méthode nous renvoie une instance de `HTMLCollection`.

4.  `getElementsByTagName`

    L'argument DOIT être un nom de balise existant d'un ou plusieurs éléments HTML. Si ce nom n'existe pas dans l'arbre
    DOM, le résultat de cet méthode nous renvoie une instance de `HTMLCollection`.

5.  `querySelector`

    L'argument DOIT être un sélecteur CSS existant d'un élément HTML. Si ce sélecteur n'existe pas dans l'arbre DOM, le
    résultat de cet méthode nous renvoie `null`.

6.  `querySelectorAll`

    L'argument DOIT être un sélecteur CSS existant d'un ou plusieurs éléments HTML. Si ce sélecteur n'existe pas dans
    l'arbre DOM, le résultat de cet méthode nous renvoie `NodeList`.

Un élément `input` nous renvoie une instance de classe de type `HTMLInputElement`. On a vu comment on pouvait récupérer
la valeur depuis cet instance avec la propriété `value`. Étant donné que cette valeur est une chaîne de caractères, nous
devons convertir en un nombre. Quelques cours auparavant, nous avons vu la fonction `Number.parseFloat` pour se faire.
La conversation PEUT échouer dans le cas où l'on ne met pas des nombres, il faudra donc gérer cette erreur. On doit
également gérer le cas d'erreur où l'on met une valeur inférieur ou égale à `0`.

Tous les éléments disposent d'une propriété `innerHTML` dans lequel nous pouvons récupérer le contenu HTML enfant. On
n'a pas encore vu comment modifier, mais JE suppose qu'il faut simplement affecter une nouvelle chaîne à celle-ci.

