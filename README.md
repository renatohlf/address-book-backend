# Address-book

#### RESTful API for an AddressBook



## Table of Contents
- [Technologies](#technologies)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
  - [yarn dev](#yarn-dev)
  - [yarn start](#yarn-start)
  - [yarn test](#yarn-test)
  - [yarn build](#yarn-build)
  - [yarn rs](#yarn-rs)

- [Troubleshooting](#troubleshooting-1)
  - [`yarn dev` mongodb not running](#yarn-dev-mongodb-not-running)
- [Something Missing?](#something-missing)

## Technologies
- Node.js
- Express
- MongoDB
- Mongoose
- Jest
- JWT

## Getting Started

Start by installing the dependencies 

```bash 
    yarn install
```

Start Mongodb with Replica Sets

```bash 
    yarn rs
```

In another terminal, run the application using nodemon

```bash 
    yarn dev
```


## Available Scripts

In the project directory, you can run:

### `yarn dev`

Runs the app in the development mode.<br>

### `yarn start`

Runs the app in the production mode<br>

### `yarn test`

Launches the test runner in the interactive watch mode.<br>

### `yarn build`

Builds the app for production to the `build` folder.<br>

Currently the app is built on Heroku after every push to master branch.

## Troubleshooting

### `yarn dev` mongodb not running

`MongooseServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017` <br>

If you are getting an error message like this in your terminal, it means that you need to run mongodb with Replica Sets. <br>

Run mongodb Replica Sets using the command `yarn rs`, then restart your application running `yarn dev` ant it may work.

## Something Missing?

If you have ideas for more “How To” recipes that should be on this page, [let us know](https://github.com/renatohlf/bethehero-backend)
