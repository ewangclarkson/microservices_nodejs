const axios = require('axios');
const {httpStatus, errorMessages} = require('../http/exceptions');
const {getProject,getProjects,createProject,updateProject,deleteProject} = require('../domain/services/ProjectServiceImpl');
const {validateProject} = require('../domain/model/Project');


async function createAProject(req, res) {
    const {error} = validateProject(req.body);
    if (error) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);
    const project = await createProject(req.body);
    return res.status(httpStatus.SUCCESS).send(project);
}

async function updateAProject(req, res) {
    const {error} = validateProject(req.body);
    if (error || !req.params.id) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);
    const project = await updateProject(req.params.id, req.body);
    return res.status(httpStatus.SUCCESS).send(project);
}

async function getAProject(req, res) {
    if (!req.params.id) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);
    const project = await getProject(req.params.id);
    return res.status(httpStatus.SUCCESS).send(project);
}

async function getProjectList(req, res) {
    const projectList = await getProjects();
    return res.status(httpStatus.SUCCESS).send(projectList);
}

async function deleteAProject(req, res) {
    const project = await getProject(req.params.id);

    if (!req.params.id || !project) return res.status(httpStatus.BAD_REQUEST).send(errorMessages.BAD_REQUEST);
    await deleteProject(req.params.id);
    return res.status(httpStatus.SUCCESS).send("The project was successfully deleted");
}

module.exports = {
    getAProject,
    getProjectList,
    updateAProject,
    deleteAProject,
    createAProject
}