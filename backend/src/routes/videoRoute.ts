import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import uploader from "../config/multer.js";
import videoController from "../controllers/videoController.js";
import interactionController from "../controllers/interactionController.js";

const router = Router();

router.post('/upload',
    auth,
    uploader.fields([
        {name:"video",maxCount:1},
        {name:"thumbnail",maxCount:1}
    ]),
    videoController.uploadVideo
);
router.get('/',auth,videoController.getAllVideos);
router.get('/subscribed-videos',auth,videoController.getSubscribeVideos);
router.post('/:videoId/interact',auth,interactionController.toggleInteraction); 

export default router;