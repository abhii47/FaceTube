import { NextFunction, Request, Response } from "express";
import videoService from "../services/videoService.js";
import { apiResponse } from "../utils/apiResponse.js";

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

export default {
    uploadVideo
};
