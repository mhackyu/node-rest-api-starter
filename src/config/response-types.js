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
  },
  NOT_FOUND: {
    status: 404,
    message: 'Resource not found.',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Unauthorized.',
  },
  ENDPOINT_NOT_FOUND: {
    status: 404,
    message: 'Endpoint not found.',
  },
  ALREADY_EXISTS: {
    status: 409,
    message: 'Data already exists.',
  },
  BAD_REQUEST: {
    status: 400,
    message: 'Bad request.',
  },
  EMAIL_ERROR: {
    status: 500,
    message: 'Something went wrong to email service.',
  },
  VALIDATION_ERROR: {
    status: 422,
    message: 'Error while validating request.',
  },
  FORBIDDEN: {
    status: 403,
    message: 'You are not authorized to perform the request',
  },
  NOT_ALLOWED_CORS: {
    status: 403,
    message: 'Not allowed by CORS.',
  },
  OBJECTION_ERROR: {
    status: 500,
    message: 'Objection error.',
  },
};

module.exports = {
  ...success,
  ...error,
};
