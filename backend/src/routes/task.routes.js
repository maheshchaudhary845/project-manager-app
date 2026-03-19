const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controller');
const protect = require('../middleware/auth.middleware');

router.use(protect);

router.route('/').post(createTask);
router.route('/project/:projectId').get(getTasks);
router.route('/:id')
.put(updateTask)
.delete(deleteTask);

module.exports = router;