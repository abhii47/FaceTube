import { NextFunction, Request, Response } from "express";
import interactionService from "../services/InteractionService.js";
import { apiResponse } from "../utils/apiResponse.js";

const toggleInteraction = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const userId = req.user!.id;
        const videoId = Number(req.params.videoId);
        const interactionType = req.body.interactionType as "like" | "dislike";
        const result = await interactionService.toggleInteraction({videoId,userId,interactionType});
        return apiResponse(res,200,`Interaction ${result.action} successfully`,result);
    } catch (err:any) {
        next(err);
    }
}

export default {
    toggleInteraction
};