# Exercice 1

## Instruction

Affichez les prénoms les-uns en dessous des autres sans utiliser de boucle.

## Exemple des données

| `$variable` | prénom        |
| ----------- | ------------- |
| `$prénom1`  | "Mike"        |
| `$prénom2`  | "Say"         |
| `$prénom3`  | "Erica"       |
| `$prénom4`  | "Jérémie"     |
| `$prénom5`  | "Timothy"     |
| `$prénom6`  | "Carina"      |
| `$prénom7`  | "Zakaria"     |
| `$prénom8`  | "Maxime"      |
| `$prénom9`  | "Clovis"      |
| `$prénom10` | "Mohamed-Ali" |

## Sortie attendue

> Le prénom est `<prénom>`

---

> Le prénom est Mike
> Le prénom est Say
> Le prénom est Erica
> Le prénom est Jérémie
> Le prénom est Timothy
> Le prénom est Carina
> Le prénom est Zakaria
> Le prénom est Maxime
> Le prénom est Clovis
> Le prénom est Mohamed-Ali

## Réflexion

On a vu que pour afficher la donnée une chaîne de caractère, il faut utiliser la
fonction [`echo`](https://www.php.net/manual/fr/function.echo.php).

## Plan d'action

Étant donné que j'ai en ma possession des variables `$variables` avec la valeur de `<prénom>`
Alors j'affiche via la fonction `echo`, le message de sortie attendue pour chaque `<prénom>` individuellement
