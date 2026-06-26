import { NextFunction, Request, Response } from "express";
import videoService from "../services/videoService.js";
import { apiResponse } from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

const uploadVideo = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const files = req.files as {video:Express.Multer.File[],thumbnail?:Express.Multer.File[]};
        const userId = req.user!.id;
        const video = files.video?.[0];
        const thumbnail = files.thumbnail?.[0];
        const result = await videoService.uploadVideo({userId,video,...req.body,thumbnail});
        return apiResponse(res,201,"Video Uploaded Successfully",result); 
    } catch (err:any) {
        next(err);
    }
}

const getAllVideos = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
        const result = await videoService.getAllVideos({page,limit});
        return apiResponse(res,200,"All Videos Fetched Successfully",result);
    } catch (err:any) {
        next(err);
    }
}

const getVideoById = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const videoId = Number(req.params.videoId);
        if(isNaN(videoId)){
            throw new ApiError(400,"Invalid video id");
        }
        const result = await videoService.getVideoById(videoId);
        return apiResponse(res,200,"Video Fetched Successfully",result);
    } catch (err:any) {
        next(err);
    }
}

const getMyVideos = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const userId = req.user!.id;
        const result = await videoService.getMyVideos(userId);
        return apiResponse(res,200,"My Videos Fetched Successfully",result);
    } catch (err:any) {
        next(err);
    }
}

const getSubscribeVideos = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));
        const userId = req.user!.id;
        const result = await videoService.getSubscribeVideos({page,limit,userId});
        return apiResponse(res,200,"Subscribed Videos Fetched Successfully",result);
    } catch (err:any) {
        next(err);
    }
}

const deleteVideo = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const videoId = Number(req.params.videoId);
        if(isNaN(videoId)){
            throw new ApiError(400,"Invalid video id");
        }
        const userId = req.user!.id;
        const result = await videoService.deleteVideo({videoId,userId});
        return apiResponse(res,200,"Video deleted successfully",result);
    } catch (err:any) {
        next(err);
    }
}

export default {
    uploadVideo,
    getAllVideos,
    getVideoById,
    getMyVideos,
    getSubscribeVideos,
    deleteVideo
};
