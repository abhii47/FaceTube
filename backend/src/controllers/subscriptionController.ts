import { NextFunction, Request, Response } from "express";
import subscriptionService from "../services/subscriptionService.js";
import { apiResponse } from "../utils/apiResponse.js";
import ApiError from "../utils/apiError.js";

const subscribeOrUnsubscribeUser = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const userId = req.user!.id;
        const subscribedToId = Number(req.params.userId);
        if(isNaN(subscribedToId)){
            throw new ApiError(400,"Invalid user id");
        }
        const result = await subscriptionService.subscribeOrUnsubscribeUser({subscribedToId,userId});
        return apiResponse(res,200,`User ${result.action} successfully`,result);
    } catch (err:any) {
        next(err);
    }
}

export default {
    subscribeOrUnsubscribeUser
};