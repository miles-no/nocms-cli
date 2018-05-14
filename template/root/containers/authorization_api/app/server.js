const app = require('express')();
const config = require('nocms-config-client').get();
const logger = require('nocms-logger');
const cookieParser = require('cookie-parser');
const authorization = require('./authorization');
const expressLogger = require('nocms-express-logger');
const correlator = require('nocms-express-correlation-id');
const prometheus = require('prom-client');
const expressMetrics = require('nocms-express-metrics');
const expressHealth = require('express-healthcheck');

const port = 3000;

app.use(cookieParser(config.tokenSecret));
app.use(correlator());
app.use(expressLogger(logger));
app.use(expressMetrics({
  prometheus,
  enableNodeMetrics: true,
  enableGCMetrics: true,
}));
app.use('/health', expressHealth());

app.get('/claims/:userId', (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    res.status(400).send('Bad request. Missing required uri parameter');
    return;
  }
  const claims = authorization.getClaims(userId);
  res.status(200).json(claims);
});

// TODO, This following route needs to be put into a custom authrization container because of details bindings to auth0.
app.get('/claims', (req, res) => {
  const { email } = req.query._json;
  if (!email) {
    res.status(400).send('Bad request. Missing required query parameter');
    return;
  }
  const claims = authorization.getClaims(email);
  res.status(200).json(claims);
});

try {
  app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
} catch (e) {
  logger.error('Couldn\'t start server', e);
}

