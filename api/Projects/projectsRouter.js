const express = require('express');

const Projects = require('./projectModel');

const projectsRouter = express.Router();

projectsRouter.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.get();
        res.status(200).json(projects);
    } catch (err) {
        next({code: 500, action: 'getting', subject: 'projects'});
    }
});

projectsRouter.get('/:id', async (req, res, next) => {
    const projectId = req.params.id;
    try {
        const project = await Projects.get(projectId);
        if (project) {
            res.status(200).json(project);
        } else {
            next({code: 404, action: 'getting', subject: 'project. Project with specified ID does not exist'});
        }
    } catch (err) {
        next({code: 500, action: 'getting', subject: 'project'});
    }
});

projectsRouter.post('/', projectCheck, async (req, res, next) => {
    try {    
        const project = await Projects.insert({...req.body, completed: false});
        res.status(201).json(project);
    } catch (err) {
        next({code: 500, action: 'adding', subject: 'project'});
    }
});

function projectCheck (req, res, next) {
    if (!req.body.name || !req.body.description) {
        next({code: 400, action: 'updating', subject: 'post. Post name and description required'})
        return;
    } else {
        next();
    }
};

projectsRouter.use(projectsError);

function projectsError(err, req, res, next) {
    res.status(err.code).json({ errorMessage: `Error ${err.action} the ${err.subject}.` });
}

module.exports = projectsRouter;