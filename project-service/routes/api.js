const express = require('express');
const router = express.Router();
const {
    getAProject,
    getProjectList,
    updateAProject,
    createAProject,
    deleteAProject
} = require('../app/controller/ProjectController');

const auth = require('../app/middleware/auth');

/**
 * Projects routes
 */

router.get('', auth, getProjectList);
router.get('/:id', auth, getAProject);
router.post('', auth, createAProject);
router.put('/:id', auth, updateAProject);
router.delete('/:id', auth, deleteAProject);

module.exports = router;