const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const { v4: uuid } = require('uuid');
const useragent = require('express-useragent');

const { port, responseTypes, corsConfig } = require('./src/config');
const { logger, passport } = require('./src/lib');
const morganMiddleware = require('./src/middlewares/morgan.middleware');
const responseMiddleware = require('./src/middlewares/response.middleware');
const apiRoutes = require('./src/routes');

const app = express();

// Setup middleware for parsing application/json
app.use(express.json());

// Setup middleware for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Setup cors and whitelisting
const corsOptions = {
  origin: (origin, callback) => {
    if (
      corsConfig.whitelist.indexOf(origin) !== -1 ||
      (!origin && !corsConfig.restrict)
    ) {
      callback(null, true);
    } else {
      const e = new Error('Not allowed by CORS');
      e.code = 'ECORSNOTALLOWED';
      logger.error(e);
      callback(e);
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Setup basic security emplementations
app.use(helmet());

// Setup response compression - compress all responses
app.use(compression());

// Setup HTTP request logger middleware
app.use(morganMiddleware());

// Setup response middleware
app.use(responseMiddleware(responseTypes));

// Setup passport auth middleware
app.use(passport.initialize());

// Setup useragent middleware
app.use(useragent.express());

const d = new Date();

app.get('/', (req, res) =>
  res.success('SUCCESS', `Healthy since ${d.toString()}`),
);

app.use('/api/v1', apiRoutes);

app.use('*', (req, res) => res.error('ENDPOINT_NOT_FOUND'));

// CORS Error handler
app.use((err, req, res, next) => {
  if (err.code === 'ECORSNOTALLOWED')
    res
      .status(403)
      .json({ error: { id: uuid(), message: 'Not allowed by CORS' } });
  return next(err);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening to http://localhost:${port}`);
});
