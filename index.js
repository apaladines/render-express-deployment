const express = require('express');
const cors = require('cors');
const boom = require('@hapi/boom');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Handling CORS
const whitelist = ['http://localhost:8080', 'https://www.google.com'];
const options = {
  origin: (origin, cb) => {
    if (whitelist.includes(origin) || !origin) {
      cb(null, true);
    } else {
      cb(boom.forbidden('Access denied'));
    }
  }
};
app.use(cors(options));

app.listen(port, () => {
  console.log('Mi port ' + port);
});

app.get('/', (req, res) => {
  res.send('Hello, my server in express');
});

app.get('/new-endpoint', (req, res) => {
  res.send('Hello, I am a new endpoint');
});

app.get('/categories/:catId/products/:prodId', (req, res) => {
  const {catId, prodId} = req.params;

  res.json({
    catId,
    prodId
  });
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
