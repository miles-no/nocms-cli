const config = require('nocms-config-client');
const app = require('express')();
const logger = require('nocms-logger');
const cookieParser = require('cookie-parser');
const expressLogger = require('nocms-express-logger');
const correlator = require('express-correlation-id');

const port = 3000;

app.use(cookieParser());
app.use(correlator());
app.use(expressLogger(logger));

const fragments = {
  // myFragment: require('./fragments/myFragment');
};

app.get('/fragments/:fragment', (req, res) => {
  const fragmentHandler = fragments[req.params.fragment];

  if (!fragmentHandler) {
    res.status(404).send('404 Not found');
    return;
  }
  fragmentHandler(req, res);
});

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
