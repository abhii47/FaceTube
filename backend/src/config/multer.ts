import multer from "multer";
import path from "path";
import fs from "fs";
import ApiError from "../utils/apiError.js";

const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        const folderMap = {
            video:"videos",
            thumbnail:"thumbnails"
        };
        const folder = folderMap[file.fieldname as keyof typeof folderMap];
        if(!folder){
            return cb(new ApiError(400,"Invalid Field Name"),"");
        }
        const dir = path.join(
            process.cwd(),
            `../uploads/${folder}/user_${req.user!.id}`
        );
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive:true});
        }
        cb(null,dir);
    },

    filename:(req,file,cb) => {
        const fileName = `${req.user!.id}_${Date.now()}${path.extname(file.originalname)}`;
        cb(null,fileName);
    }
})

const uploader = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*300
    },
    fileFilter: (req, file, cb) => {
    const allowedExtensions = {
        video: [".mp4",".mov", ".mkv", ".webm"],
        thumbnail: [".jpg", ".jpeg", ".png", ".webp"]
    };
    const fileExtension = path.extname(file.originalname).toLowerCase();
    
    const validExtension = allowedExtensions[file.fieldname as keyof typeof allowedExtensions];
    if (!validExtension) {
        return cb(new ApiError(400, `Unexpected field: ${file.fieldname}`));
    }
    if(!validExtension.includes(fileExtension)){
        cb(new ApiError(400,`Invalid file type. Only ${validExtension.join(", ")} are allowed.`));
    } else {
       cb(null, true); 
    }
  }
});

export default uploader;