# Installing dependencies

This app uses [Node](https://nodejs.org), [Express](https://expressjs.com/), [React](https://reactjs.org/) and [Mongoose](https://mongoosejs.com/).
Once you have `npm` installed, you need to install app dependencies.
Run the next command in the project root directory: `npm run mern` . This will install dependencies for both front and back end.

# Starting the app

This app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To start React run `npm start` in the project root directory. React will use port `3000` .
To start Node run `npm run server` in the same folder as before. Node will use port `8080` .

Checkout the [API Documentation](https://documenter.getpostman.com/view/5509767/S1M2T6e4?version=latest)

# Libraries used

- [Classnames](https://github.com/JedWatson/classnames) - JavaScript utility for conditionally joining classNames together.
- [axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
- [body-parser](https://github.com/expressjs/body-parser) - Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
- [dotenv](https://github.com/motdotla/dotenv) - loads environment variables from a .env file into process.env
- [nodemon](https://github.com/remy/nodemon) - automatically restarts the node application when file changes in the directory are detected.
- [mocha](https://mochajs.org/) - JavaScript test framework running on Node.js and in the browse
- [Chai](https://www.chaijs.com/) - BDD / TDD assertion library for node and the browser

# Project structure

```
.
├── public
├── server
│   ├── controllers
│   ├── models
│   └── test
└── src
    └── components
        └── Reports
```

# Testing the app

Run `npm test` in the project root directory. This will test both front and back end. If you want to test them individually, you can run `npm run test-react` or `npm run test-server`.
