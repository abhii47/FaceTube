import { Router } from "express";
import { auth } from "../middlewares/auth.js";
import uploader from "../config/multer.js";
import videoController from "../controllers/videoController.js";
import interactionController from "../controllers/interactionController.js";
import commentController from "../controllers/commentController.js";

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
router.delete('/comment/:commentId',auth,commentController.deleteComment);
router.get('/:videoId',auth,videoController.getVideoById);
router.delete('/:videoId',auth,videoController.deleteVideo);
router.post('/:videoId/interact',auth,interactionController.toggleInteraction); 
router.post('/:videoId/comment',auth,commentController.addComment);
router.get('/:videoId/comment',auth,commentController.commentsOnVideo);

export default router;