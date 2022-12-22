# Backend Co-Emplettes

## Étapes :
1. ```git clone https://gitlab.telecom-paris.fr/pact/2022-2023/pact74```
2. ```git checkout backend```
3. ```cd backend```
4. ```npm install```

## Connexion au serveur de Télécom et pont BDD :
- connexion : ```ssh ubuntu@137.194.211.70```
- connexion pour mapper la BDD sur son port local 5000 : ```ssh ubuntu@137.194.211.70 -L 5000:localhost:3306```

## Fichiers de configuration en local :
- ajouter le mdp de la BDD : créer un fichier ```credentials.ts``` dans ```src``` contenant le code suivant :
 ```
 export const db_password = "[MDP LA BDD]"
 # où l'on remplace [MDP LA BDD] par le mdp
 ```

## Visualiser le diagramme :
Aller sur [DrawIO](https://draw.io) et ouvrir le fichier ```BDD-API-diagram.drawio```
