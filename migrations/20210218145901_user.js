exports.up = function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username', 50);
    table.string('first_name', 50);
    table.string('last_name', 50);
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
