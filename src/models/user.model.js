const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  fullName() {
    return `${this.first_name} ${this.last_name}`;
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'first_name', 'last_name'],

      properties: {
        username: { type: 'string', minLength: 1, maxLength: 50 },
        first_name: { type: 'string', minLength: 1, maxLength: 50 },
        last_name: { type: 'string', minLength: 1, maxLength: 50 },
      },
    };
  }
}

module.exports = User;
