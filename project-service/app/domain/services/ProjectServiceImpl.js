const {Project} = require('../model/Project');


async function getProjects() {
    return Project.find();
}

async function getProject(id) {
    return Project.findOne({_id: id});
}

async function updateProject(id, project) {
    return Project.findByIdAndUpdate({_id: id}, {
        $set: {
            name: project.name,
            expiryDate:project.expiryDate,
            description:project.description
        }
    }, {new: true});
}


async function createProject(project) {
    const projectRes = new Project({
        name: project.name,
        expiryDate: project.expiryDate,
        description: project.description
    });

    return projectRes.save();
}

async function deleteProject(id) {
    return Project.deleteOne({_id: id});
}

module.exports={
    getProjects,
    getProject,
    updateProject,
    createProject,
    deleteProject
}