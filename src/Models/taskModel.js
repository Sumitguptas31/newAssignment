const mongoose = require("mongoose")

const ObjectId=mongoose.Schema.Types.ObjectId
const taskSchema = new mongoose.Schema({
    projectId:{
        type:ObjectId,
        required:true,
        ref:"project"
    },
      taskName: {
        type:String,
        required:true,
    },
    category: {
        type: String,
        required: true
    },
},{timestamps:true})
module.exports=mongoose.model("reviews",ReviewSchema)