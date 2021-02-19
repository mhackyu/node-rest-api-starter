exports.up = function (knex) {
  return knex.schema.createTable('todos', (table) => {
    table.increments('id').primary();
    table.string('title', 50);
    table.text('body');
    table.integer('user_id').references('users.id');
    table.dateTime('created_at').defaultTo(knex.fn.now());
    table.dateTime('updated_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('todos');
};
