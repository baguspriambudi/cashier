# Service Cashier
## Introduction
[Node.JS](https://nodejs.org/en/) | [Express](https://expressjs.com/) | [MongoDB](https://www.mongodb.com/)<br/>
This is my repository built with Node JS, Framework Express and MongoDB, for cashier services. In this service the admin can make a discount for certain products with a minimum discount and a maximum discount, the admin can also create a member for a customer for a certain period of time, a customer who has a member will get a 5% discount on the total purchase based on certain conditions
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
## Setting up Project
1. Setup `.prettierrc` 
2. Setup `.eslintrc.json` and running eslint  `"lint"    : "eslint ."`
3. Setup environtment variable, rename `.env.example` to `.env`
4. Use husky `npm i -D husky` to run eslint before `commit` and run testing before `push`
5. [Enabling GitHub integration and automatic deploys](https://devcenter.heroku.com/articles/github-integration)
## Features
1. Generate QR Code `npm i -s qrcode`
## How to run the app ?
1. Clone or download first this repository with `https://github.com/baguspriambudi/cashier.git`<br/>
2. Open the project in your favorite text editor<br/>
3. Open your terminal or cmd and type `npm install`<br/>
4. Run server, type `npm run dev`
## Documentation
1. Create transaction_products `POST`<br/>
- Body :
```
{
    "member"  : "M-1601775027150",
    "products": [
                  {
                     "product" : "5f789cb6bf1eec00173d96a7",
                     "qty"     : 5
                  },
                  {
                     "product" : "5f789fdebf1eec00173d96a8",
                     "qty"     : 5
                  }
                ]
}
```
- Result :
```
{
    "status"  : 200,
    "message" : "succesfully create transaction",
    "data"    : {
                  "products": [
                                {
                                  "_id"         : "5f792725d63d860017b866be",
                                  "product"     : "5f789cb6bf1eec00173d96a7",
                                  "transaction" : "5f792724d63d860017b866bd",
                                  "qty"         : 5,
                                  "tgl"         : "2020-10-04T01:36:36.386Z",
                                  "member"      : "M-1601775027150",
                                  "price"       : 2000,
                                  "diskon"      : 5,
                                  "__v"         : 0
                                },
                                {
                                  "_id"         : "5f792725d63d860017b866bf",
                                  "product"     : "5f789fdebf1eec00173d96a8",
                                  "transaction" : "5f792724d63d860017b866bd",
                                  "qty"         : 5,
                                  "tgl"         : "2020-10-04T01:36:36.386Z",
                                  "member"      : "M-1601775027150",
                                  "price"       : 2000,
                                  "diskon"      : 0,
                                  "__v"         : 0
                                }
                            ],
                "amount": 18525
              }
}
```
2. View transactions `GET`<br/>
- Result :
```
{
    "status"  : 200,
    "message" : "data founded",
    "data"    : [
                  {
                    "_id"         : "5f792724d63d860017b866bd",
                     "createdAt"  : "2020-10-04T00:00:00.000Z",
                      "updatedAt" : "2020-10-04T00:00:00.000Z",
                      "__v"       : 0,
                      "amount"    : 18525,
                      "product"   : [
                                      {
                                        "_id"     : "5f792725d63d860017b866be",
                                        "product" : 
                                             {
                                                "_id" : "5f789cb6bf1eec00173d96a7",
                                                "name": "sarimi diskon"
                                             },
                                        "transaction" : "5f792724d63d860017b866bd",
                                        "qty"         : 5,
                                        "tgl"         : "2020-10-04T01:36:36.386Z",
                                        "member"      : "M-1601775027150",
                                        "price"       : 2000,
                                        "diskon"      : 5,
                                        "__v"         : 0
                                      },
                                      {
                                        "_id": "5f792725d63d860017b866bf",
                                        "product": 
                                             {
                                                "_id" : "5f789fdebf1eec00173d96a8",
                                                "name": "indomi "
                                             },
                                         "transaction": "5f792724d63d860017b866bd",
                                         "qty"        : 5,
                                         "tgl"        : "2020-10-04T01:36:36.386Z",
                                         "member"     : "M-1601775027150",
                                         "price"      : 2000,
                                         "diskon"     : 0,
                                         "__v"        : 0
                                      }
                                    ]
              }
            ]
}           

```
