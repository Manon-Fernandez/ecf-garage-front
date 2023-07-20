
# Garage front-end

Ce repository est le front-end de l'ECF garage, application pour Vincent Parrot.


## Pré-requis
Il vous faudra sur votre poste :
- [NodeJS version LTS](https://nodejs.org/)
- [Angular 16](https://angular.io/start)
- [yarn](https://yarnpkg.com/getting-started/install)

N'oubliez pas egalement un IDE, vous aidant de manière considérable.
- [Visual Studio code](https://code.visualstudio.com/)
- [WebStorm](https://www.jetbrains.com/fr-fr/webstorm/download/)

## Utilisation

Afin de pouvoir lancer le projet, vous devez lancer à la racine :
```bash
yarn install
 ```
Cela permettera d'obtenir sur votre poste toutes les dependances du projet, puis, lancez :
```bash
yarn run start
```
Angular va lancer l'UI sur votre port 4200.

PS : Si vous avez lancez le back-end en local, pas besoin de changer le code ! via les environnements, Angular se charge de tout (elle est pas belle la vie ?)

## Identifiant

L'application possède par defaut un utilisateur ADMIN, l'identifiant est : vparrot@garageparrot.fr et le mot de passe : &1AOJLKO&!98a

Si vous voulez concevoir un identifiant de type "Employe", vous devrez en faire la création depuis le [compte admin](http://localhost:4200/admin)

## Deploiement

Ce projet est déployé sur un Cloud RUN GCP via GitHub Actions à chaque push sur la branch deploiement.

L'application est déployé en mode production afin d'augmenter la sécurité de manière significative.

## Auteur
Manon FERNANDEZ.



