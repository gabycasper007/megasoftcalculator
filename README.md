This app is Dockerized. If you want to know more about the [CI/CD process](<#CI/CD\ process>), go to the last section of this doc. Checkout the [API Documentation](https://documenter.getpostman.com/view/5509767/S1M2T6e4?version=latest) if you want to know more about that.

# Installing dependencies

This app uses [Node](https://nodejs.org), [Express](https://expressjs.com/), [React](https://reactjs.org/) and [MongoDB](https://www.mongodb.com/).
Once you have `npm` installed, you need to install app dependencies.
Run the next command in the project root directory: `npm run mern` . This will install dependencies for both front and back end.

# Starting the app

This app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To start React run `npm start` in the project root directory. React will use by default port `3000` .
To start Node run `npm run server` in the same folder as before. Node will use by default port `8090` .

# Libraries used

- [Mongoose](https://mongoosejs.com) - Mongodb object modeling for node.js
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

# CI/CD process

This app is live on a Ubuntu EC2 AWS instance at http://13.250.35.17/.
A Jenkins container is installed on another instance at http://18.136.102.212:8080/

- When someone pushes a new commit, Github notifies Jenkins through a `webhook`.
- Jenkins will use the `Jenkinsfile` from this app's root directory to pull the changes, install dependencies, test the app and build it for production
- After this, Jenkins will create 2 docker images, one for front end, one for back end. This images are based on the next [dockerfiles](https://docs.docker.com/engine/reference/builder/): `./Dockerfile` for front end and `./server/Dockerfile` for back end.
- Once the docker images are created, Jenkins will push them to Dockerhub
- After this, Jenkins will `ssh` into the production server and run the `server.sh` script from this app's root directory
- The `server.sh` script will copy the `docker-compose.yml` file front this app's root directory to the server and run [docker-compose commands](https://docs.docker.com/compose/overview/) to run the front and back containers created earlier by Jenkins, plus a mongodb one.
- The back end image will start a pm2 process based on the next file from this app's directory: `./server/ecosystem.config.js`
