const { db } = require('./src/config');

module.exports = {
  development: {
    client: db.client,
    connection: {
      host: db.host,
      database: db.name,
      user: db.user,
      password: db.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  staging: {
    client: db.client,
    connection: {
      host: db.host,
      database: db.name,
      user: db.user,
      password: db.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: db.client,
    connection: {
      host: db.host,
      database: db.name,
      user: db.user,
      password: db.password,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
