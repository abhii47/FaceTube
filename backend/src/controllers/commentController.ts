import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse.js";
import commentService from "../services/commentService.js";
import ApiError from "../utils/apiError.js";

const addComment = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const videoId = Number(req.params.videoId);
        if(isNaN(videoId)){
            throw new ApiError(400,"Invalid video id");
        }
        const comment = req.body.comment;
        const userId = req.user!.id;
        const result = await commentService.addComment({videoId,userId,comment});
        return apiResponse(res,200,"Comment added successfully",result);
    } catch (err:any) {
        next(err);
    }
}

const commentsOnVideo = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const videoId = Number(req.params.videoId);
        if(isNaN(videoId)){
            throw new ApiError(400,"Invalid video id");
        }
        const page = Math.max(1,Number(req.query.page) || 1);
        const limit = Math.min(50,Number(req.query.limit) || 10);
        const result = await commentService.commentsOnVideo({videoId,page,limit});
        return apiResponse(res,200,"Comments on video fetched successfully",result);
    } catch (err:any) {
        next(err);
    }
}

const deleteComment = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const commentId = Number(req.params.commentId);
        if(isNaN(commentId)){
            throw new ApiError(400,"Invalid comment id");
        }
        const userId = req.user!.id;
        const result = await commentService.deleteComment({commentId,userId});
        return apiResponse(res,200,"Comment deleted successfully",result);
    } catch (err:any) {
        next(err);
    }
}

export default {
    addComment,
    commentsOnVideo,
    deleteComment
}