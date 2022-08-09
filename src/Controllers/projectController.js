const projectModel = require("../Models/projectModel");
const UserModel = require("../Models/UserModel");


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const createProject = async function (req, res) {
    try {
        let data = req.body
        const { projectName,projectTitle,userId,category,} = data
        if (!isValidRequestBody(data)) {
            return res.status(400).send({ status: false, msg: "enter data in user body" })
        }
        if (!isValid(projectName)) {
            return res.status(400).send({ status: false, msg: "enter projectName in the body" })
        }
        const isProject= await projectModel.findOne({ projectName })
        if (isProject) {
            return res.status(400).send({ msg: "projectName should be unique" })
        }
        if (!isValid(projectTitle)) {
            return res.status(400).send({ status: false, msg: "enter title in the body" })
        }
        const isProjectTitle = await projectModel.findOne({ projectTitle })
        if (isProjectTitle) {
            return res.status(400).send({ msg: "projectTitle should be unique" })
        }
        if (!isValid(userId)) {
            return res.status(400).send({ status: false, msg: "enter valid userId" })
        }
        const isuserId = await UserModel.findOne({ _id: userId })
        if (!isuserId) {
            return res.status(400).send({ msg: "Invalid UserId" })
        }
        
        if (!isValid(category)) {
            return res.status(400).send({ status: false, msg: "enter category" })
        }


        const ProjectData = await projectModel.create(data)
        return res.status(201).send({ msg: "sucessfully created", data: ProjectData })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}



const getProjectById = async function(req,res){
    try{
     const id= req.params.projectId
     const projectdata= await projectModel.findOne({_id:id})
   res.status(201).send({status:true,msg:'project-list',data:projectdata})
    }
    catch(error){
        res.status(500).send({status:false, msg:error.message})
    }
}

const updateProject = async function(req,res){
    try{
         let newProjectName= req.body.projectName
         let newProjectTitle=req.body.projectTitle
         let newCatogary= req.body.category
         let id= req.params.projectId
         let project = await projectModel.findOne({ _id: id, isDeleted: false })
         if(!project){
            return res.status(400).send({status:false,msg:"no project found"})
        }
        
         let newProject= await projectModel.findOneAndUpdate( { _id:id, isDeleted:false },
            { $set: {projectName:newProjectName,projectTitle:newProjectTitle,category:newCatogary} },
            { new: true })
            res.status(201).send({status:true,msg:'project data updated',data:newProject})

    }
    catch(error){
        res.status(500).send({status:false,msg:error.message})
    }
}






module.exports.createProject = createProject
module.exports.getProjectById=getProjectById
module.exports.updateProject=updateProject