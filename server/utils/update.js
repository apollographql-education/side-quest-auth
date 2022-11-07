const concurrently = require('concurrently');
const path = require('path');

concurrently(
  [
    {
      command: 'npm update',
      name: 'accounts',
      cwd: path.resolve(__dirname, '../services/accounts'),
      prefixColor: 'blue',
    },
    {
      command: 'npm update',
      name: 'listings',
      cwd: path.resolve(__dirname, '../services/listings'),
      prefixColor: 'magenta',
    },
    {
      command: 'npm update',
      name: 'bookings',
      cwd: path.resolve(__dirname, '../services/bookings'),
      prefixColor: 'green',
    },
    {
      command: 'npm update',
      name: 'reviews',
      cwd: path.resolve(__dirname, '../services/reviews'),
      prefixColor: 'yellow',
    },
  ],
  {
    prefix: 'name',
    restartTries: 3,
  }
);
