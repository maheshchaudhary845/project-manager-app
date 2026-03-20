const Task = require('../models/Task');
const Project = require('../models/Project');

exports.getTasks = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.projectId);

        if (!project) {
            res.status(404);
            throw new Error('Project not found');
        }

        if (project.owner.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized');
        }

        const tasks = await Task.find({ project: req.params.projectId }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        next(err);
    }
}

exports.createTask = async (req, res, next) => {
    try {
        const { title, description, projectId } = req.body;

        if (!title || !projectId) {
            res.status(400);
            throw new Error('Title and projectId are required');
        }

        const project = await Project.findById(projectId);

        if (!project) {
            res.status(404);
            throw new Error('Project not found')
        }

        if (project.owner.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to add tasks to this project');
        }

        const task = await Task.create({
            title,
            description,
            project: projectId,
            owner: req.user._id
        });

        res.status(201).json(task);
    } catch (err) {
        next(err);
    }
}

exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        if (task.owner.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to update this task');
        }

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        )

        res.json(updatedTask);

    } catch (err) {
        next(err);
    }
}

exports.deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        if (task.owner.toString() !== req.user._id.toString()) {
            res.status(403);
            throw new Error('Not authorized to delete this task');
        }

        await task.deleteOne();
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        next(err);
    }
}