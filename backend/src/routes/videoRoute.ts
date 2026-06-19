import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import uploader from "../config/multer.js";
import videoController from "../controllers/videoController.js";

const router = Router();

router.post('/upload',
    auth,
    uploader.fields([
        {name:"video",maxCount:1},
        {name:"thumbnail",maxCount:1}
    ]),
    videoController.uploadVideo
);

export default router;