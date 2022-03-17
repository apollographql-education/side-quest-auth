# Odyssey Side Quest - Auth (Airlock)

Welcome to the companion app of Odyssey's Side Quest: Auth! This is a simplified version of the Airlock app. You can [find the course lessons and instructions on Odyssey](http://odyssey.apollographql.com/side-quest-auth), Apollo's learning platform.

You can [preview the completed demo app here](https://odyssey-airlock.netlify.app/).

## How to use this repo

The course will walk you through step by step how to turn this monolithic graph into a federated graph. This codebase is the starting point of your journey!

### Backend

To get started:

1. In a terminal window, change into the `server` directory, then run `npm install`.
1. Run `npm start`.

This will start the GraphQL API server on [http://localhost:4000](http://localhost:4000)

Next, let's run some local services.

1. In a new terminal window, change into the `server` directory and run `npm run launch`. This will run 3 local services, which you can learn about in the accompanying Odyssey course.

#### Resetting the database

After playing around with the data, you may want to reset to its initial state. To do this, run `npm run db:reset`.

### Frontend

To start the Airlock client:

1. In a terminal window, change into the `client` directory, then run `npm install`.
1. Then, run `npm start`.

This will open up a new browser tab to [http://localhost:3000](http://localhost:3000)

## Getting Help

For any issues or problems concerning the course content, please [refer to the Odyssey topic in our community forums](https://community.apollographql.com/tags/c/help/6/odyssey).