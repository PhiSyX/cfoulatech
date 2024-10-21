# Exercice 8

## Instruction

Afficher tous les éléments d'un tableau associatif avec `foreach`
Chaque note DOIT être noté sur 20.

## Exemple d'un tableau associatif `<user>`

| prénom | nom     | genre | date anniversaire | notes     | ville     |
| ------ | ------- | ----- | ----------------- | --------- | --------- |
| "Lara" | "Croft" | "f"   | "15-03-1995"      | `<notes>` | "Londres" |

## Example d'un tableau de `<notes>`

| indice | note |
| ------ | ---- |
| 0      | 18   |
| 1      | 13   |
| 2      | 5    |
| 3      | 9    |
| 4      | 10   |

## Sortie attendue

> prénom: Lara  
> nom: Croft  
> genre: f  
> date anniversaire: 15-03-1995  
> notes: [ 18/20 13/20 5/20 9/20 10/20 ]  
> ville: Londres

## Réflexion

On a vu comment utiliser la structure de contrôle [foreach](https://www.php.net/manual/fr/control-structures.foreach.php).

On a vu que l'on NE PEUT PAS afficher un tableau avec la fonction [`echo`](https://www.php.net/manual/fr/function.echo.php).

## Plan d'action

Étant donné que j'utilise une boucle foreach sur le tableau `<user>`  
Et que je veux récupérer chaque clé `<clé>` et chaque valeur `<valeur>`  
Et que la `<valeur>` n'est pas un tableau  
Alors je veux afficher "`<clé>`: `<valeur>`"  
Sinon étant donné que j'utilise une boucle foreach sur le tableau `<valeur>`  
Alors je renomme `<valeur>` par `<notes>`  
Et que je veux récupérer chaque valeur `<note>`  
Alors je veux afficher "`<clé>`: [ "
Et je veux afficher "`<note>` / 20 "
Et je veux afficher "]"
