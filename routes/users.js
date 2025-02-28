const express = require('express');
const UsersService = require('./../services/users');
const validatorHandler = require('./../middlewares/validator.handler');
const { findUserSchema, createUserSchema, updateUserSchema } = require('./../schemas/user');

const router = express.Router();
const service = new UsersService();

// app.get('/', (req, res) => {
//   res.json(users);
// });

// Query params
// router.get('/', (req, res) => {
//   const { limit, offset } = req.query;

//   if (limit && offset) {
//     res.json({
//       limit,
//       offset
//     });
//   } else {
//     res.send('No params sent');
//   }
// });

router.get('/', (req, res) => {
  const users = service.find();
  res.status(200).json(users);
});

router.get('/:id',
  validatorHandler(findUserSchema, 'params'),
  (req, res) => {
    const { id } = req.params;
    const user = service.findOne(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ 'mensaje': 'User not found' });
    }
  }
);

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  (req, res) => {
    const body = req.body;
    const newUser = service.create(body);
    res.status(201).json(newUser);
  }
);

router.patch('/:id',
  validatorHandler(findUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const user = service.update(id, body);
    res.json(user);
  }
);

router.delete('/:id',
  validatorHandler(findUserSchema, 'params'),
  (req, res) => {
    const { id } = req.params;
    const response = service.delete(id);
    res.json(response);
  }
);


module.exports = router;
