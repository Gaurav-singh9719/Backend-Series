const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
// local file upload -> handler function creation

exports.localFileUpload = async (req, res) =>{
    try {
        // fetch file from request
        const file = req.files.file;
        console.log("File Aa gai jee", file);
        // create path where file need to be stored on server  
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path ->", path);
        
        // add path to the move function
        file.mv(path, (err) =>{
            console.log(err);
        });
        // create a successful response
        res.json({
            success:true,
            message:"local file uploaded successfully",
        })
    } catch (error) {
        console.log("Not able to upload the file on server")
        console.log(error);
    }
}
function  isFileTypeSupported(type, supportedTypes){
    return supportedTypes.includes(type);
}
async function uploadFileToCloudinary(file, folder, quality){
    const options = {folder};
    console.log("temp file path",file.tempFilePath);
    if(quality){
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options );
}
// image upload handler
exports.imageUpload = async (req,res) =>{
    try {
        // data fetch
        const {name, email,tags} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes =["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate not supported",
            })
        }
        // file format supported
        console.log("Uploading to codeHelp")
        const response = await uploadFileToCloudinary(file, "codeHelp");
        console.log(response);
        // Entry save in database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl: response.secure_url,
            message:"image successfully uploaded",
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

// video upload handler

exports.videoUpload = async (req, res) =>{
    try {
        // data fetch
        const {name, tags, email} = req.body;
        console.log(name, tags, email);
        const file = req.files.videoFile;

        // validation
        const supportedTypes =["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        // TODO: add a upper limit of 5mb for video
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate not supported",
            })
        }
        // file format supported
        console.log("Uploading to codeHelp")
        const response = await uploadFileToCloudinary(file, "codeHelp");
        console.log(response);

        // database entries
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl: response.secure_url,
            message:"video successfully uploaded",
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:"something went Wrong",
        })
    }
}

// image reducer
exports.imageSizeReducer = async (req, res) =>{
    try {
         // data fetch
        const {name, email,tags} = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes =["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);
        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file formate not supported",
            })
        }
        // file format supported
        console.log("Uploading to codeHelp")
        const response = await uploadFileToCloudinary(file, "codeHelp", 30);
        console.log(response);
        // Entry save in database
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.json({
            success:true,
            imageUrl: response.secure_url,
            message:"image successfully uploaded",
        })
    } catch (error) {
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Something went Wrong",
        })
    }
}