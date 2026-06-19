import ApiError from "../utils/apiError.js";
import { Video } from "../models/index.js";

type UploadVideoPayload = {
    userId:number,
    video:Express.Multer.File,
    title:string,
    description?:string | null,
    thumbnail?:Express.Multer.File | null
}

const uploadVideo = async(payload:UploadVideoPayload) => {
    const {userId,video,title,description,thumbnail} = payload;
    if(!video || !title ){
        throw new ApiError(400,"File and Title are required");
    }
    const videoUrl = `/uploads/videos/user_${userId}/${video.filename}`
    const thumbnailUrl = thumbnail ? `/uploads/thumbnails/user_${userId}/${thumbnail.filename}` : null;
    const uploadedVideo = await  Video.create({
        title,
        user_id:userId,
        video_url:videoUrl,
        description:description ?? null,
        thumbnail_url:thumbnailUrl
    });
    return uploadedVideo;

}

export default {
    uploadVideo
}