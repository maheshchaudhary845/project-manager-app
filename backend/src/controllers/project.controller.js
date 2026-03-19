const Project = require('../models/Project');
const Task = require('../models/Task');

exports.getProjects = async(req, res, next)=>{
    try{
        const projects = await Project.findOne({owner: req.user._id}).sort({createdAt: -1});
        res.json(projects)
    }catch(err){
        next(err);
    }
}

exports.createProject = async(req, res, next)=>{
    try{
        const {name, description} = req.body;

        if(!name){
            res.status(400);
            throw new Error('Project name is required')
        }

        const project = await Project.create({
            name, 
            description,
            owner: req.user._id
        })

        res.status(201).json(project);
    }catch(err){
        next(err);
    }
}

exports.deleteProject = async(req, res, next)=>{
    try{
        const project = await Project.findById(req.params.id);

        if(!project){
            res.status(404);
            throw new Error('Project not found')
        }
        
        if(project.owner.toString() !== req.user._id.toString()){
            res.status(403);
            throw new Error('Not authorized to delelte this project');
        }

        await Task.deleteMany({project: req.params.id});
        await Project.deleteOne();

        res.json({
            message: 'Project and its tasks deleted successfully'
        })
    }catch(err){
        next(err);
    }
}