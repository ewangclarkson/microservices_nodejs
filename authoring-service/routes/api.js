const express = require('express');
const router = express.Router();
const {login, registerUser, getAuth} = require('../app/controller/auth/AuthController');
const {
    getAUser,
    updateAUser,
    getUserList,
    deleteAUser
} = require('../app/controller/UserController');
const auth = require('../app/middleware/auth');


/**
 *  Authentication routes
 */
router.post('/login', login);
router.get('/me', auth, getAuth);
router.post('/register', registerUser);

/**
 * Users routes
 */

router.get('/users', auth, getUserList);
router.get('/users/:id', auth, getAUser);
router.put('/users/:id', auth, updateAUser);
router.delete('/users/:id', auth, deleteAUser);

module.exports = router;