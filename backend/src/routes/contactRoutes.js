const express = require('express');
const { body } = require('express-validator');
const { submitContact, getMessages, markRead } = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], submitContact);

router.get('/', protect, adminOnly, getMessages);
router.patch('/:id/read', protect, adminOnly, markRead);

module.exports = router;
