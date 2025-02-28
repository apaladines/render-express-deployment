const express = require('express');
const CategoriesService = require('./../services/categories');
const validatorHandler = require('./../middlewares/validator.handler');
const { findCategorySchema, createCategorySchema, updateCategorySchema } = require('./../schemas/category');

const router = express.Router();
const service = new CategoriesService();

router.get('/', (req, res) => {
  const categories = service.find();
  res.status(200).json(categories);
});

router.get('/:id',
  validatorHandler(findCategorySchema, 'params'),
  (req, res) => {
    const { id } = req.params;
    const category = service.findOne(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ 'mensaje': 'Category not found' });
    }
  }
);

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  (req, res) => {
    const body = req.body;
    const newCategory = service.create(body);
    res.status(201).json(newCategory);
  }
);

router.patch('/:id',
  validatorHandler(findCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const category = service.update(id, body);
    res.json(category);
  }
);

router.delete('/:id',
  validatorHandler(findCategorySchema, 'params'),
  (req, res) => {
    const { id } = req.params;
    const response = service.delete(id);
    res.json(response);
  }
);


module.exports = router;
