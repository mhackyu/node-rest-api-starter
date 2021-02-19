const { Model } = require('objection');

const User = require('./user.model');

/**
 * @swagger
 *  components:
 *    schemas:
 *      Todo:
 *        type: object
 *        required:
 *          - title
 *          - body
 *          - user_id
 *        properties:
 *          id:
 *            type: integer
 *            description: Unique ID
 *          title:
 *            type: string
 *            description: Title of your todo
 *          body:
 *            type: string
 *            description: Description of your todo
 *          created_at:
 *            type: date
 *            description: Date created
 *          updated_at:
 *            type: date
 *            description: Date updated
 *        example:
 *          title: Grocery List
 *          body: Buy milk and eggs
 *          user_id: 1
 */
class Todo extends Model {
  static get tableName() {
    return 'todos';
  }

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'body', 'user_id'],

      properties: {
        title: { type: 'string', minLength: 1, maxLength: 50 },
        body: { type: 'string' },
        user_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'todos.user_id',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Todo;
