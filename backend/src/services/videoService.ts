import ApiError from "../utils/apiError.js";
import { User, Video } from "../models/index.js";

type UploadVideoPayload = {
    userId:number,
    video:Express.Multer.File,
    title:string,
    description?:string | null,
    thumbnail?:Express.Multer.File | null
}
type Pagination = {
    page:number,
    limit:number
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
    return uploadedVideo.toJSON();

}

const getAllVideos = async(payload:Pagination) => {
    const {page,limit} = payload;
    const {count,rows} = await Video.findAndCountAll({
        limit,
        offset:(page-1)*limit,
        order:[['created_at','DESC']],
        attributes:["video_id","user_id","title","video_url","thumbnail_url","view_count"],
        include:{
            model:User,
            as:"uploader",
            attributes:["username","avatar_url"],
        },
    });
    return {
        totalVideos:count,
        totalPages:Math.ceil(count/limit),
        currentPage:page,
        videos:rows
    };
}

export default {
    uploadVideo,
    getAllVideos
}