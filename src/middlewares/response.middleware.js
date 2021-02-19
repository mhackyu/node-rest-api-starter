const { v4: uuid } = require('uuid');
const {
  ValidationError,
  NotFoundError,
  DBError,
  UniqueViolationError,
  NotNullViolationError,
  ForeignKeyViolationError,
  CheckViolationError,
  DataError,
} = require('objection');

const { isProd } = require('../config');
const { logger } = require('../lib');

const errorHandler = (err, res) => {
  if (err instanceof ValidationError) {
    switch (err.type) {
      case 'ModelValidation':
        res.status(400).send({
          message: err.message,
          type: err.type,
          data: err.data,
        });
        break;
      case 'RelationExpression':
        res.status(400).send({
          message: err.message,
          type: 'RelationExpression',
          data: {},
        });
        break;
      case 'UnallowedRelation':
        res.status(400).send({
          message: err.message,
          type: err.type,
          data: {},
        });
        break;
      case 'InvalidGraph':
        res.status(400).send({
          message: err.message,
          type: err.type,
          data: {},
        });
        break;
      default:
        res.status(400).send({
          message: err.message,
          type: 'UnknownValidationError',
          data: {},
        });
        break;
    }
  } else if (err instanceof NotFoundError) {
    res.status(404).send({
      message: err.message,
      type: 'NotFound',
      data: {},
    });
  } else if (err instanceof UniqueViolationError) {
    res.status(409).send({
      message: err.message,
      type: 'UniqueViolation',
      data: {
        columns: err.columns,
        table: err.table,
        constraint: err.constraint,
      },
    });
  } else if (err instanceof NotNullViolationError) {
    res.status(400).send({
      message: err.message,
      type: 'NotNullViolation',
      data: {
        column: err.column,
        table: err.table,
      },
    });
  } else if (err instanceof ForeignKeyViolationError) {
    res.status(409).send({
      message: err.message,
      type: 'ForeignKeyViolation',
      data: {
        table: err.table,
        constraint: err.constraint,
      },
    });
  } else if (err instanceof CheckViolationError) {
    res.status(400).send({
      message: err.message,
      type: 'CheckViolation',
      data: {
        table: err.table,
        constraint: err.constraint,
      },
    });
  } else if (err instanceof DataError) {
    res.status(400).send({
      message: err.message,
      type: 'InvalidData',
      data: {},
    });
  } else if (err instanceof DBError) {
    res.status(500).send({
      message: err.message,
      type: 'UnknownDatabaseError',
      data: {},
    });
  } else {
    res.status(500).send({
      message: err.message,
      type: 'UnknownError',
      data: {},
    });
  }
};

module.exports = function (responseTypes) {
  return function (req, res, next) {
    res.success = (responseId, responseMessage = null, responseData = null) => {
      const response = responseTypes[responseId];
      logger.info({
        message: `Success response: ${responseMessage || response.message}`,
        data: responseData,
      });
      res.status(response.status).json({
        message: responseMessage || response.message,
        ...responseData,
      });
    };

    res.error = (responseId, responseData = null) => {
      const id = uuid();
      const response = responseTypes[responseId];
      logger.error({
        id,
        message: `Error response: ${response.message}`,
        data: responseData,
      });

      if (isProd) {
        if (responseId === 'OBJECTION_ERROR') {
          errorHandler(responseData, res);
        } else {
          res.status(response.status).json({
            error: {
              id,
              message: response.message,
            },
          });
        }
      } else if (!isProd) {
        if (responseId === 'OBJECTION_ERROR') {
          errorHandler(responseData, res);
        } else {
          res.status(response.status).json({
            error: {
              id,
              message: response.message,
            },
            ...responseData,
          });
        }
      }
    };

    next();
  };
};
