const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');

const { readFileSync } = require('fs');
const axios = require('axios');
const gql = require('graphql-tag');

const { AuthenticationError } = require('./utils/errors');

const typeDefs = gql(readFileSync('./schema.graphql', { encoding: 'utf-8' }));
const resolvers = require('./resolvers');

const BookingsDataSource = require('./datasources/bookings');
const ReviewsDataSource = require('./datasources/reviews');
const ListingsAPI = require('./datasources/listings');
const AccountsAPI = require('./datasources/accounts');
const PaymentsAPI = require('./datasources/payments');

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const port = 4000;

  try {
    const { url } = await startStandaloneServer(server, {
      context: async ({ req }) => {
        // 1) Retrieve the Bearer token from the request's Authorization header
        //    (Note the lowercase "a" in authorization,
        //    because all headers are transformed to lowercase)
        const token = req.headers.authorization || '';

        // Get the user token after "Bearer "
        const userId = token.split(' ')[1]; // e.g. "user-1"

        // Initialize the userInfo object where the user's id and role will be stored
        //    with a successful authentication
        let userInfo = {};

        if (userId) {
          // 2) Authenticate the user using the accounts API endpoint
          const { data } = await axios.get(`http://localhost:4011/login/${userId}`).catch((error) => {
            throw AuthenticationError();
          });

          // 3) After a successful login, store the user's id and role
          //    in the userInfo object,
          //    which will be passed to `context` below for the resolvers to use
          userInfo = { userId: data.id, userRole: data.role };
        }

        // Below is the `context` object resolvers will have access to
        return {
          ...userInfo,
          dataSources: {
            bookingsDb: new BookingsDataSource(),
            reviewsDb: new ReviewsDataSource(),
            listingsAPI: new ListingsAPI(),
            accountsAPI: new AccountsAPI(),
            paymentsAPI: new PaymentsAPI(),
          },
        };
      },
      listen: {
        port,
      },
    });

    console.log(`🚀  Server ready at ${url}`);
  } catch (err) {
    console.error(err);
  }
}

startApolloServer();
