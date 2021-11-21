const { v4: uuid } = require('uuid');
const { Prisma } = require('@prisma/client');

const { logger } = require('../lib');

const errorHandler = ({ id, err, response, res }) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    res.status(500).send({
      id,
      message: err.message,
      type: 'PrismaClientKnownRequestError',
      data: {},
    });
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    res.status(500).send({
      id,
      message: err.message,
      type: 'PrismaClientUnknownRequestError',
      data: {},
    });
  } else if (err instanceof Prisma.PrismaClientRustPanicError) {
    res.status(500).send({
      id,
      message: err.message,
      type: 'PrismaClientRustPanicError',
      data: {},
    });
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    res.status(500).send({
      id,
      message: err.message,
      type: 'PrismaClientInitializationError',
      data: {},
    });
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(500).send({
      id,
      message: err.message,
      type: 'PrismaClientValidationError',
      data: {},
    });
  } else {
    res.status(response.status).json({
      id,
      message: response.message,
      type: response.type,
      ...err,
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

    res.error = (responseId, err = null) => {
      const id = uuid();
      const response = responseTypes[responseId];
      logger.error({
        id,
        message: `Error response: ${response.message}`,
        data: err,
      });

      errorHandler({ id, err, response, res });
    };

    next();
  };
};
