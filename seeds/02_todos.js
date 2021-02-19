exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todos')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('todos').insert([
        { title: 'Awesome Title', body: 'Awesome body', user_id: '1' },
      ]),
    );
};
