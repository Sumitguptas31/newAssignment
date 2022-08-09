const projectModel = require("../Models/projectModel");
const UserModel = require("../Models/UserModel");
const taskModel = require("../Models/taskModel")


const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}


const createTask= async function (req, res) {
    try {
        let data = req.body
        let ProjectId = req.params.projectId
        const { projectId, projectName, category } = data

        if (!isValidRequestBody(data)) {
            return res.status(400).send("Please enter valid details in body")
        }

        if (!isValid(projectId)) {
            return res.status(400).send({ status: false, msg: "Enter bookId " })
        }

        if (ProjectId !== projectId) {
            return res.status(400).send({ status: false, msg: "Enter valid projectId in body" })
        }



        if (!isValid(projectName)) {
            return res.status(400).send({ status: false, msg: "Enter projectName " })
        }

        if (!isValid(category)) {
            return res.status(400).send({ status: false, msg: "Enter category" })
        }

        let project = await projectModel.findOne({ _id: bookId })
        if (!project) {
            res.status(404).send({ msg: "No project found" })
        }

        const newTask = await taskModel.create(data)
        return res.status(201).send({ status: true, Data: newTask })


    } catch (error) {
        return res.status(500).send(error.message)
    }

}

const getTaskById = async function(req,res){
    try{
     const id= req.params.taskId
     const taskdata= await taskModel.findOne({_id:id})
   res.status(201).send({status:true,msg:'project-list',data:taskdata})
    }
    catch(error){
        res.status(500).send({status:false, msg:error.message})
    }
}



const updateTask = async function (req, res) {
    try {
        //let data = req.body
        let taskName = req.body.taskName
        let category = req.body.category
        let projectId = req.params.projectId
        let taskId = req.params.taskId



        let project = await projectModel.findOne({ _id: projectId })

        if (project) {

            let task= await taskModel.findById({ _id: taskId })
            if (task) {
                let updateTask= await taskModel.findOneAndUpdate({ _id: taskId }, {$set:{ taskName: taskName, category: category }} ,{ new: true })

                return res.status(200).send({ data: updateTask })
            } else {
                return res.status(404).send({ status: false, msg: "No task Found" })
            }

        } else {
            return res.status(404).send({ status: false, msg: "no project found" })

        }




    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }

} 




module.exports.createTask=createTask
module.exports.updateTask=updateTask
module.exports.getTaskById=getTaskById