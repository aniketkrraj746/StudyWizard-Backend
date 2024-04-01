const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
//auth
exports.auth = async (req,res,next)=>{
    try{
        // extract token
        const token = req.cookies.token
                            ||req.body.token
                            ||req.header("Authourisation").replace("Bearer ","");
        // if token is missing ,the return response
        if(!token){
            return res.status(401).json({
                success:false,
                message:"token is missing",
            });
        }
        // verify the token
        try{
            const decode =  jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err){
                // vecification - issue
                return res.status(401).json({
                    success: false,
                    message:"token is invalid"
                })
        }
        next();
    }
    catch(error){
            return res.status(500).json({ 
                success : false,
                error:error,
                message:"some thing went wrong while validating the  token"
            })
    }
}
//isStuden
exports.isStudent=async (req,res,next)=>{
    try{
        // check user type and move to the next middleware if it's a student
        if(req.user.accountType !== "Studen"){
            return res.status(403).json({
                success:false,
                message:"You are not authorized to perform this action,This route is protected for Students only"
            })
        }

    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"User role can not be verified"
        })
    }
     next();
}
//isInstructor
exports.isInstructor = async (req, res, next) => {
   try {
     // check user type and move to the next middleware if it's a Instructor
     if (req.user.accountType !== "Instructor") {
       return res.status(403).json({
         success: false,
         message:
           "You are not authorized to perform this action,This route is protected for Instructor only",
       });
     }
   } catch (err) {
     return res.status(401).json({
       success: false,
       message: "User role can not be verified",
     });
   }
    next();
};
//isAdmin
exports.isAdmin = async (req, res, next) => {
 try {
   // check user type and move to the next middleware if it's a Admin
   if (req.user.accountType !== "Admin") {
     return res.status(403).json({
       success: false,
       message:
         "You are not authorized to perform this action,This route is protected for Admin only",
     });
   }
 } catch (err) {
   return res.status(401).json({
     success: false,
     message: "User role can not be verified",
   });
 }
 next();
};