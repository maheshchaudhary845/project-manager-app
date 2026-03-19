const express = require("express");
const router = express.Router();
const { createProject, getProjects, deleteProject } = require('../controllers/project.controller');
const protect = require('../middleware/auth.middleware');

router.use(protect);

router.route('/')
.get(getProjects)
.post(createProject);

router.route('/:id')
.delete(deleteProject);

module.exports = router;