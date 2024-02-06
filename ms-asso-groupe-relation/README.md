# ms-asso-groupe-relation

BRANCH DEV

//  installation de nestJs en global //

$ npm i -g @nestjs/cli

// création d'un nouveau projet nestJS //

$ nest new project-name

// version de nestJs 

nest -v

// installer la dépendance de mongoose sur nestJs //

npm i @nestjs/mongoose

// relier la database //

on click sur la droite de  localhost et on copy le lien //
-mongodb://localhost:27017

// ont va dans app.module.ts //
Et on met dans import MongooseModule.forRoot('mongodb://127.0.0.1:27017/')
On rajoute import { MongooseModule } from '@nestjs/mongoose';

Au cas ou npm install mongoose@6.2.2 --save

// puis ont se connect //
-Avec la commence npm run server start:dev

// installer les dépendances pour insérér les validator
npm i --save class-validator class-transformer 

// installer les dépendances pour visualiser toute nos routes dans le navigateur
npm install --save @nestjs/swagger

// installer les dépendances pour installer les librairies 
nest g library library_name



