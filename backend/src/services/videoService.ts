import ApiError from "../utils/apiError.js";
import { Subscription, User, Video } from "../models/index.js";
import { Op } from "sequelize";

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
type SubscriptionsPayload = Pagination & {
    userId:number;
}
type VideoIdPayload = {
    videoId:number,
    userId:number
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

const getVideoById = async(videoId:number) => {
    const video = await Video.findByPk(videoId,{attributes:["video_id","user_id","title","video_url","thumbnail_url","view_count"],include:{model:User,as:"uploader",attributes:["username","avatar_url"]}});
    if(!video){
        throw new ApiError(404,"Video not found");
    }
    await video.increment("view_count", { by:1 });
    return video.toJSON();
}

const getSubscribeVideos = async(payload:SubscriptionsPayload) => {
    const {page,limit,userId} = payload;

    const subscriptions = await Subscription.findAll({
        where:{
            subscriber_id:userId
        },
        attributes:["subscribed_to_id"]
    });

    const subscribedUserIds = subscriptions.map((s)=>s.subscribed_to_id);

    if(subscribedUserIds.length === 0){
        return{
            totalVideos:0,
            totalPages:0,
            currentPage:page,
            videos:[]
        }
    }

    const {count,rows} = await Video.findAndCountAll({
        where:{
            user_id:{[Op.in]:subscribedUserIds}
        },
        limit,
        offset:(page-1)*limit,
        order:[['created_at','DESC']],
        attributes:["video_id","user_id","title","video_url","thumbnail_url","view_count"],
        include:[
            {
                model:User,
                as:"uploader",
                attributes:["username","avatar_url"],
            }
        ],
    });
    return {
        totalVideos:count,
        totalPages:Math.ceil(count/limit),
        currentPage:page,
        videos:rows
    };
}

const deleteVideo = async(payload:VideoIdPayload) => {
    const {videoId,userId} = payload;
    const video = await Video.findByPk(videoId);
    if(!video){
        throw new ApiError(404,"Video not found");
    }
    if(video.user_id !== userId){
        throw new ApiError(403,"You are not authorized to delete this video");
    }
    await video.destroy();
    return {action:"deleted"};
}

export default {
    uploadVideo,
    getAllVideos,
    getVideoById,
    getSubscribeVideos,
    deleteVideo
}