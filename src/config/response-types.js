const success = {
  SUCCESS: {
    status: 200,
    message: 'Success.',
  },
  CREATED: {
    status: 201,
    message: 'Successfully created.',
  },
  UPDATED: {
    status: 200,
    message: 'Successfully updated.',
  },
};

const error = {
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Internal server error.',
    type: 'InternalServerError',
  },
  NOT_FOUND: {
    status: 404,
    message: 'Resource not found.',
    type: 'NotFoundError',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized.',
    type: 'UnauthorizedError',
  },
  ENDPOINT_NOT_FOUND: {
    status: 404,
    message: 'Endpoint not found.',
    type: 'EndpointNotFoundError',
  },
  ALREADY_EXISTS: {
    status: 409,
    message: 'Data already exists.',
    type: 'AlreadyExistsError',
  },
  BAD_REQUEST: {
    status: 400,
    message: 'Bad request.',
    type: 'BadRequestError',
  },
  EMAIL_ERROR: {
    status: 500,
    message: 'Something went wrong to email service.',
    type: 'EmailError',
  },
  VALIDATION_ERROR: {
    status: 422,
    message: 'Error while validating request.',
    type: 'RequestValidationError',
  },
  FORBIDDEN: {
    status: 403,
    message: 'You are not authorized to perform the request',
    type: 'ForbiddenError',
  },
  NOT_ALLOWED_CORS: {
    status: 403,
    message: 'Not allowed by CORS.',
    type: 'CorsError',
  },
};

module.exports = {
  ...success,
  ...error,
};
