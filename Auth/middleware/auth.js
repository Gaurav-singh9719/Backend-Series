//  auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // extract jwt token
        // Pending : other ways to fetch token
        console.log("cookie", req.cookies.token);
        console.log("body", req.body.token);
        // console.log("header", req.header("Authorization"));
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer", "")
        if(!token || token === undefined){
            return res.status(401).json({
                success: false,
                message:'Token Missing',
            });
        }
        // Verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            // why this
            req.user = decode;

        } catch(error){
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
            })
        }
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:"Something went Wrong While Verifying the Token",
        })
    }
}

exports.isStudent = (req, res, next)=>{
    try {
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: "this is a protected Route for Students",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'User Role can not be verified',
        })
    }
}

exports.isAdmin = (req, res, next) =>{
    try {
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Student",
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({

            success:false,
            message:"User Role is not Verifying",
        })
    }
}