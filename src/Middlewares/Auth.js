const jwt = require('jsonwebtoken')
const projectModel=require('../Models/projectModel')
const authentication = async (req, res, next) => {
    try {
        const token = req.header('x-api-key')
        if(!token) {
            res.status(403).send({status: false, message: `Missing authentication token in request`})
            return;
        }

        const decoded = await jwt.verify(token, 'someverysecuredprivatekey')

        if(!decoded) {
            res.status(403).send({status: false, message: `Invalid authentication token in request`})
            return;
        }

        req.UserId = decoded.UserId;
        console.log(req.UserId)

        next()
    } catch (error) {
        console.error(`Error! ${error.message}`)
        res.status(500).send({status: false, message: error.message})
    }
}


const authorisation=async (req,res,next) =>{
    try{
        let token= req.headers['x-api-key'];
        let validToken= jwt.verify(token,'someverysecuredprivatekey')
        if(!validToken) return res.status(401).send({error:"You are not authenticated user"})
        
        let projectId = req.params.projectId
        
        //if( !bookId )   bookId = req.query.bookId
        
        if( !projectId)   return res.status(400).send({error : " Please , enter projectId "})
        const data = await projectModel.find({ _id : projectId})
        if(!data)  return res.status(400).send({error : "Invalid projectId"})
    
    
        let Id= await projectModel.findById(projectId).select({userId:1})
        console.log(Id)
        let projecttobemodified=Id.userId
        console.log(projecttobemodified)
        let userloggedin=validToken.UserId
        console.log(userloggedin)
        if(projecttobemodified!=userloggedin){return res.status(403).send({msg:"Authorisation failed"})}
    
       
        
        next();
        }catch(err){
            res.status(500).send({error:err.message})
        }
    
    
    }
    


module.exports.authentication=authentication
module.exports.authorisation= authorisation