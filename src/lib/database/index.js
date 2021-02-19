const knex = require('knex');
const { Model } = require('objection');

const logger = require('../logger');
const { env } = require('../../config');
const config = require('../../../knexfile')[env];

const TAG = '[DB]';
const connection = knex(config);

connection.on('query', (data) => {
  logger.info({ message: `${TAG}[QUERY]`, data });
});

connection.on('query-error', (error) => {
  logger.error({ message: `${TAG}[ERROR] `, error });
});

connection
  .raw('SELECT VERSION()')
  .then(() => {
    logger.info({ message: 'DB connected' });
  })
  .catch((error) => {
    logger.error({ message: `Can't connect to DB` });
    throw new Error(error);
  });

Model.knex(connection);

module.exports = connection;
