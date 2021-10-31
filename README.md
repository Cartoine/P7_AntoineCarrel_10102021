# **P7 Créez un réseau social d’entreprise**

## Groupomania

Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.

Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux ! 🥂

Le client en question est Groupomania, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.

## Installation du projet

    Cloner le repositorie

    Créer une base de donnée mySQL

    dans un terminal taper la commande suivant en remplacant "user" par votre nom d'utilisateur.

```bash
mysql -u user -p
```

⚠️ mysql vous demandra ensuite votre mot de passe

Créer une table appeler "groupomania_db" avec la commande

```bash
CREATE DATABASE groupomania_db;
```

Dans le dossier **backend** ➡️ **confing** ➡️ **config.jspn** remplacer "username" et "password" par vos identifant de connection a mysql

```json
"username": "ici",
"password": "et la",
```

Dans le dossier **backend** ➡️ **.env** remplacer **"DB_USER"** et **"DB_MDP"** par vos identifant de connection a mysql.

```env
DB_USER=ici
DB_MDP=et la
```

### Intsaller les dépendances du backend

A la racine du dossier backend

```bash
npm install
```

### lancer le backend

```bash
npm start
```

### Intsaller les dépendances du front

A la racine du dossier backend

```bash
npm install
```

### lancer le backend

```bash
npm run serve
```
