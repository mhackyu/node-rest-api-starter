const router = require('express').Router();

const Todo = require('../models/todo.model');

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todos management
 */

/**
 * @swagger
 * /todos/:
 *   post:
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     description: Add a new todo
 *     responses:
 *       201:
 *         description: Successfully created
 */
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.query().insert(req.body);
    res.success('CREATED', '', todo);
  } catch (error) {
    res.error('OBJECTION_ERROR', error);
  }
});

/**
 * @swagger
 * /todos/:
 *   get:
 *     tags: [Todos]
 *     description: Get all todos
 *     parameters:
 *       - in: query
 *         name: eager
 *         schema:
 *           type: string
 *         description: The name of the table that you want to join
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The numbers of items to return
 *     responses:
 *       200:
 *         description: Returns a list of todo.
 */
router.get('/', async (req, res) => {
  const { eager, page = 1, limit = 10 } = req.query;

  try {
    const todos = await Todo.query()
      .allowGraph('users')
      .withGraphJoined(eager)
      .page(page - 1, limit);

    res.success('SUCCESS', '', {
      todos: todos.results,
      total: todos.total,
      page,
      limit,
    });
  } catch (error) {
    res.error('OBJECTION_ERROR', error);
  }
});

/**
 * @swagger
 * /todos/{id}/:
 *   get:
 *     tags: [Todos]
 *     description: Get a specific todo
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of todo item
 *     responses:
 *       200:
 *         description: Returns specific todo.
 */
router.get('/:id', async (req, res) => {
  const { eager } = req.query;
  const { id } = req.params;

  try {
    const todo = await Todo.query()
      .findById(id)
      .allowGraph('users')
      .withGraphJoined(eager);

    if (!todo) return res.error('NOT_FOUND');

    res.success('SUCCESS', '', {
      todo,
    });
  } catch (error) {
    res.error('OBJECTION_ERROR', error);
  }
});

/**
 * @swagger
 * /todos/{id}/:
 *   put:
 *     tags: [Todos]
 *     description: Update a specific todo
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of todo item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Returns a updated todo.
 */
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.query()
      .findById(id)
      .patchAndFetchById(id, req.body);

    if (!todo) return res.error('NOT_FOUND');

    res.success('UPDATED', '', {
      todo,
    });
  } catch (error) {
    res.error('OBJECTION_ERROR', error);
  }
});

/**
 * @swagger
 * /todos/{id}/:
 *   delete:
 *     tags: [Todos]
 *     description: Delete a specific todo
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         description: ID of todo item
 *     responses:
 *       200:
 *         description: Returns count of deleted item.
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Todo.query().deleteById(id);

    res.success('SUCCESS', '', {
      count,
    });
  } catch (error) {
    res.error('OBJECTION_ERROR', error);
  }
});

module.exports = router;
