# Backend

Le backend en `Symfony` va principalement servir d'API afin d'alimenter le frontend en `Angular`.

## Pré-requis

- **Langage** : `PHP` à la version `8.0` à la version `8.3`
- **Base de données** : `MySQL`
- **Framework** : `Symfony`

> [!IMPORTANT]  
> 
> L'installation du backend ne génère pas automatiquement les clés JWT, 
> pour ce faire, il suffit d'envoyer `symfony console lexik:jwt:generate-keypair`
> dans le terminal après l'installation.

## Persona 

- `ANONYMOUS`    = `ROLE_USER` and not `IS_CONNECTED`
- `CLIENT`       = `ROLE_USER` and `IS_CONNECTED`
- `PROPRIETAIRE` = `ROLE_USER` and `IS_CONNECTED`
- `ADMIN`        = `ROLE_ADMIN`

## Fonctionnalités

- Système d'inscription (`ANONYMOUS`)
- Système de connexion (`ANONYMOUS`)
- Gestion des `ROLE_USER`s par les `ROLE_ADMIN`s
- Gestion des annonces immobilières (CRUD) (`PROPRIETAIRE`)
- Recherche avancée (filtres) (`ROLE_USER`)

## Installation et configuration

```sh
composer install
symfony console lexik:jwt:generate-keypair
```

Changer les informations de le fichier .env

1. `DATABASE_URL` - par une connexion d'une base de données.
2. `MAILER_DSN` - par un mailtrap ou autre.

```sh
symfony console doctrine:database:create
symfony console doctrime:migrations:migrate
```

## Lancement du serveur

```sh
symfony server:start
```
