function ErrorHelper(name, message, stack) {
  this.name = name;
  this.message = message;
  this.stack = stack;
}

class RequestValidationError extends ErrorHelper {}

module.exports = { RequestValidationError };
