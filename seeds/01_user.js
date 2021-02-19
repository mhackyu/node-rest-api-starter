exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() =>
      // Inserts seed entries
      knex('users').insert([
        {
          username: 'mhackyu',
          first_name: 'MC',
          last_name: 'Paderes',
        },
        { username: 'juan', first_name: 'Juan', last_name: 'Dela Cruz' },
      ]),
    );
};
