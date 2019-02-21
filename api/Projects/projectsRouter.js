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

projectsRouter.get('/:id', projectIdExists, async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id);
        res.status(200).json(project);
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

projectsRouter.delete('/:id', projectIdExists, async (req, res, next) => {
    try {
        const project = await Projects.get(req.params.id);
        await Projects.remove(req.params.id);
        res.status(200).json({...project, deleted: 'successful'});
    } catch (err) {
        next({code: 500, action: 'deleting', subject: 'project'});
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

async function projectIdExists (req, res, next) {
    try {
        const project = await Projects.get(req.params.id);
        if (project) {
            next();
        }
    } catch (err) {
        next({code: 404, action: 'finding', subject: 'project. Project with specified ID does not exist'});
    }
};

projectsRouter.use(projectsError);

function projectsError(err, req, res, next) {
    res.status(err.code).json({ errorMessage: `Error ${err.action} the ${err.subject}.` });
}

module.exports = projectsRouter;