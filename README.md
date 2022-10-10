# Templates

This repo is an amalgamation of all template repositories that kyle cares about. They're meant to represent inital code that's required for an app that is commonly buit. 

## Directory:
```
  .
  + frontend # All solo frontend templates
   + eslint
    - .eslintrc-react.cjs # eslintrc for react app, add eslint-plugin-unused-imports and --save-dev
   + react
    + basic # A basic react template that does nothing
    + basic-with-store # clone of frontend/react/basic with zustand store implemented
  + fullstack # All backend 
   + nestjs-react-prisma # A nestjs backend with prisma and react. React app is based off of basic-with-store and has a basic backend call
   + nestjs-react-prisma-auth # A nestjs backend with prisma, react and auth. React app is based off of basic-with-store and has a basic authenticated call
```

## App template vars
_All app template vars should be the same regardless of the template, this'll let you bootstrap any info you need into the app._

`app_name` = Any place the app name is mentioned


## How to use this
I haven't used this yet, but I imagine that once it's ready you'll just do the following if you want to use the basic react template in your current project into a directory called <app_name>-frontend
```
npx degit KyleMoran138/templates#main/frontend/react/basic <app_name>-frontend
```
