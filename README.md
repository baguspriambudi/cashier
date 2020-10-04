# Service Cashier
## Introduction
[Node.JS](https://nodejs.org/en/) | [Express](https://expressjs.com/) | [MongoDB](https://www.mongodb.com/)<br/>
This is my repository built with Node JS, Framework Express and MongoDB, for cashier services
#### What is Node.JS ?<br/>
Node.js is a platform used for developing web-based applications. This platform uses JavaScript as its programming language which was designed by Ryan Dahl
#### What is Express ?<br/>
express is a web framework used to create a RESTful API, the excellence of which is:<br/>
1. Support for middleware creation<br/>
2. Support for various HTTP verbs such as POST, GET, PUT, DELETE, OPTION, HEAD, and others<br/>
3. Jade template engine is installed<br/>
4. Static file management such as CSS and Javascript
#### What is MongoDB ?<br/>
MongoDB is a document-oriented database system that makes it easier to create table relational
## Requirements
1. `npm` (node package manager)<br/>
2. `npm init -y` to create a package.json file to lock the library version used
## Features
1. Setup .prettierrc 
```
{
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 120,
  "tabWidth": 2
}
```
2. Setup .eslintrc.json and running eslint
```
{
  "extends": ["airbnb", "prettier", "plugin:node/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    "consistent-return": "off",
    "no-underscore-dangle": "off"
  }
}
```
```
"scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
```
3. Create middleware using @hapi/joi `npm i -s @hapi/joi`
4. Generate QR Code `npm i -s qrcode`
5. Create unit testing using chai `npm i -D chai chai-http mocha` and run it using mocha `npm run test`
```
"scripts": {
    "test": "mocha --timeout 10000 --exit"
  },
```
6. Use husky `npm i -D husky` to run eslint before `commit` and run testing before `push`
```
 "husky": {
    "hooks": {
      "pre-commit": "npm run lint",
      "pre-push": "npm run test"
    }
  },
```
7. [Enabling GitHub integration and Automatic deploys](https://devcenter.heroku.com/articles/github-integration)
## How to run the app ?
1. Clone or download first this repository with `https://github.com/baguspriambudi/cashier.git`<br/>
2. Open the project in your favorite text editor<br/>
3. Open your terminal or cmd and type `npm install`<br/>
4. Run server, type `npm run dev`
## Documentation
