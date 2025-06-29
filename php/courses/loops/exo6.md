# Exercice 6

## Instruction

Afficher tous les nombres pairs d'un tableau en utilisant une boucle `while` ou
`for`

## Exemple des `<nombres>`

| indice | nombre |
| ------ | ------ |
| 0      | 11     |
| 1      | 18     |
| 2      | 99     |
| 3      | 17     |
| 4      | 65220  |
| 5      | 6485   |
| 6      | 78     |
| 7      | 97     |
| 8      | 48     |
| 9      | 2      |
| 10     | 112    |

## Sortie attendue

| nombre | pair |
| ------ | ---- |
| 11     | non  |
| 18     | oui  |
| 99     | non  |
| 17     | non  |
| 65220  | oui  |
| 6485   | non  |
| 78     | oui  |
| 97     | non  |
| 48     | oui  |
| 2      | oui  |
| 112    | oui  |

En fonction du résultat de la comparaison via le modulo:

**oui**:

> `<nombre>` est pair

---

> 18 est pair
> 65220 est pair
> 78 est pair
> 48 est pair
> 2 est pair
> 112 est pair

## Réflexion

On a vu comment on pouvait compter le nombre total des éléments d'un tableau via
la fonction [`count`](https://www.php.net/manual/fr/function.count.php).

On a vu comment utiliser la structure de contrôle [for](https://www.php.net/manual/fr/control-structures.for.php)
et [while](https://www.php.net/manual/fr/control-structures.while.php)

Les boucles `while` et `for` s'effectuent tant que la condition est vraie.

Étant donné que j'effectue des instructions à partir des éléments d'un tableau,
je préfère utiliser la boucle `for`, car j'ai besoin d'un compteur qui va me
servir de condition de sortie, qui serait que le compteur soit supérieur ou égal
au nombre total des éléments du tableau des `<nombres>`.

On a vu comment on pouvait faire des [opérations arithmétiques](https://www.php.net/manual/fr/language.operators.arithmetic.php)
notamment le modulo pour trouver chaque nombre pair.

## Plan d'action

Étant donné que j'utilise une boucle for avec un compteur initial à `0`
Et que l'étape d'incrémentation se fait par `1`
Alors je veux afficher le nombre `<nombre>` en fonction du compteur qui représente l'indice `<indice>` du tableau `<nombres>`
Uniquement si le nombre `<nombre>` est un nombre PAIR.
