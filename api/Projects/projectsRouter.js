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

projectsRouter.use(projectsError);

function projectsError(err, req, res, next) {
    res.status(err.code).json({ errorMessage: `Error ${err.action} the ${err.subject}.` });
}

module.exports = projectsRouter;