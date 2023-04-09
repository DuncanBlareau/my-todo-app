# Todo App avec TypeScript et React

Ce projet est une application Todo développée avec TypeScript et React. L'application permet de gérer une liste de tâches, avec des fonctionnalités pour ajouter, marquer comme complétées et supprimer des tâches.

## Fonctionnalités

- Ajouter un todo avec un titre et une description (optionnelle)
- Marquer un todo comme complété ou en cours
- Supprimer tous les todos de la liste
- Afficher les détails d'un todo
- Mock des données d'API avec Mock Service Worker (MSW)
- Sauvegarde des todos dans le localStorage pour conserver les données entre les sessions de navigation
  - Note : Lors du rechargement de la page, les todos sauvegardés dans le localStorage sont remplacés par les todos mockés, car la liste est réinitialisée avec les données de l'API mockée.
- Utilisation de Docker et Docker Compose pour exécuter l'application

## Architecture du code

Le projet utilise les composants suivants :

- `TodoList` : Affiche la liste des todos et gère la suppression de tous les todos
- `TodoItem` : Représente un todo individuel dans la liste
- `TodoDetails` : Affiche les détails d'un todo spécifique

Le dossier `api` contient les fonctions pour communiquer avec l'API :
- `getTodos`
- `toggleTodo`
- `addTodo`
- `deleteAllTodos`

Le dossier `models` contient les types et interfaces pour les données de l'application.

## Bibliothèques utilisées

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [Mock Service Worker (MSW)](https://mswjs.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)

## Instructions d'installation

1. Clonez le dépôt avec `git clone <url-du-dépôt>`
2. Accédez au dossier du projet avec `cd <nom-du-dossier>`
3. Installez les dépendances avec `npm install`

## Utilisation

Pour exécuter l'application en mode développement, exécutez `npm start` et accédez à [http://localhost:3000](http://localhost:3000) dans votre navigateur.

Pour exécuter l'application avec Docker, assurez-vous que Docker et Docker Compose sont installés, puis exécutez `docker-compose up` et accédez à [http://localhost:80](http://localhost:80).

Pour exécuter les tests, exécutez `npm test`.

## Informations supplémentaires

Ce projet a été créé avec [Create React App](https://github.com/facebook/create-react-app) et utilise [React Router](https://reactrouter.com/) pour la navigation entre les pages.

Pour en savoir plus sur React, consultez la [documentation de React](https://reactjs.org/).
