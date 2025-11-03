# Frontend

## Pré-requis

- **Langage** : `TypeScript`
- **Framework** : `Angular`

## Description

Le frontend en `Angular` est ergonomique et est responsive. Il fournit un HTML sémantique afin d'avoir un référencement naturelle efficace (SEO). 

## Persona 

- `ANONYMOUS`    = `ROLE_USER` and not `IS_CONNECTED`
- `CLIENT`       = `ROLE_USER` and `IS_CONNECTED`
- `PROPRIETAIRE` = `ROLE_USER` and `IS_CONNECTED`
- `ADMIN`        = `ROLE_ADMIN`

## Pages

- Page d'inscription (`ANONYMOUS`)
- Page de connexion (`ANONYMOUS`)
- Pages de gestion des utilisateurs (`ADMIN`)
- Pages de gestion des annonces immobilières (`PROPRIETAIRE`)
- Page de profil pour les `PROPRIETAIRE` | `ADMIN`
- Page de contact

## Fonctionnalités

- Recherche avancée avec filtres (`ANONYMOUS`)

## Installation du frontend

```sh
npm install
```

## Lancement du serveur de développement

```sh
npm run start
```

> [!WARNING]
> Il ne faut pas lancer le serveur avec la commande globale de la CLI
> d'angular avec `ng serve` car j'utilise pour ce projet un fichier
> proxy.config.json qui est lié à la commande `npm run start`.
