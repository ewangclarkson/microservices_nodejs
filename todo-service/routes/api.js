const express = require('express');
const router = express.Router();
const {
    getATodo,
    getTodoList,
    updateATodo,
    createATodo,
    deleteATodo
} = require('../app/controller/TodoController');

const auth = require('../app/middleware/auth');


/**
 * Todos routes
 */

router.get('', auth, getTodoList);
router.get('/:id', auth, getATodo);
router.post('', auth, createATodo);
router.put('/:id', auth, updateATodo);
router.delete('/:id', auth, deleteATodo);

module.exports = router;