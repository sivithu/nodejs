# API nodejs
Ceci est une API nodeJs de test.
Application : https://nodejsetape1.herokuapp.com


## Installation des packages
* Pour installer les packages nécessaires pour le bon fonctionnement de l'API, taper cette commande dans l'invite de commande :
```
npm install
```
## Utilisation de l'API
* Pour afficher un "Hello World" :
https://nodejsetape1.herokuapp.com/hello
* Pour récupérer l'historique d'échange entre le bot et l'utlisateur : 
https://nodejsetape1.herokuapp.com/messages/all 
  * Pour l'instant, seulement fonctionnel en local, taper cette commande (fonctionnel sur v2.2.3):
  ```
  $ curl -X GET http://localhost:3000/messages/all
  ```
* Supprimer le dernier message: 
  * Pour l'instant, seulement fonctionnel en local, taper cette commande (fonctionnel sur v2.2.3):
  ```
  $ curl -X DELETE http://localhost:3000/messages/last
  ```
## Plusieurs améliorations à venir
* Communication entre user et bot
* Mise en production  : 
  - Suppression du dernier message
  - Liste d'historique

## Version
* Voir les versions disponibles : 


