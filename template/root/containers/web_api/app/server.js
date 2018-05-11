const express = require('express');
const bodyParser = require('body-parser');
const config = require('nocms-config-client').get();
const logger = require('nocms-logger');
const cookieParser = require('cookie-parser');
const expressLogger = require('nocms-express-logger');
const correlator = require('express-correlation-id');
const cors = require('cors');
const { readClaims, verifyClaim } = require('nocms-auth');
const {
  exportPages,
  getAllPages,
  pageHistory,
} = require('nocms-data-providers')({ pageService: config.pageService });

const app = express();
const mountPoint = '/api';
const port = 3000;

app.use(cors());
app.use(cookieParser()); // Only needed if Authorization header is not set
app.use(readClaims(config.tokenSecret, logger));

app.all(`${mountPoint}/nocms/*`, verifyClaim('admin', logger));

app.use(bodyParser.json());
app.use(correlator());
app.use(expressLogger(logger));

app.get(`${mountPoint}/nocms/export-pages`, exportPages);
app.get(`${mountPoint}/nocms/get-all-pages`, getAllPages);
app.get(`${mountPoint}/nocms/page-history`, pageHistory);

app.listen(port, () => logger.info(`Server running on port ${port}`));
