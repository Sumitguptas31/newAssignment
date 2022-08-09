const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId
const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        unique: true
    },
    projectTitle: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: "Usersdata"
    },
    category: {
        type: String,
        required: true
    },  
    

}, { timestamps: true })

module.exports = mongoose.model("project", projectSchema)