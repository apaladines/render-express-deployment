const express = require('express');

const userRoutes = require('./users');
const categoryRoutes = require('./categories');
const productRoutes = require('./products');

function routerApi(app) {
  // Adding api prefix
  const apiRouter = express.Router();
  app.use('/api/v1', apiRouter);

  apiRouter.use('/users', userRoutes);
  apiRouter.use('/categories', categoryRoutes);
  apiRouter.use('/products', productRoutes);
}

module.exports = routerApi;
