import { NextFunction, Request, Response } from "express";
import userSerivce from "../services/userService.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerController = async(
    req:Request, 
    res:Response, 
    next:NextFunction
) => {
    try {
        const result = await userSerivce.registerUser(req.body);
        return apiResponse(res,201,"User Registered Successfully",result);
    } catch (err:any) {
        next(err);
    }
}

const loginController = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const result = await userSerivce.loginUser(req.body);
        res.cookie("refreshToken",result.refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const { refreshToken, ...resultData } = result;
        return apiResponse(res,200,"User Logged In Successfully",resultData);
    } catch (err:any) {
        next(err);
    }
}

const refreshAccessTokenController = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const result = await userSerivce.refreshAccessToken(req.cookies.refreshToken);
        res.cookie("refreshToken",result.refreshToken,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        const { refreshToken, ...resultData } = result;
        return apiResponse(res,200,"Access Token Refreshed Successfully",resultData);
    } catch (err:any) {
        next(err);
    }
}

const getCurrentUser = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const userId = req.user!.id;
        const result = await userSerivce.getCurrentUser(userId);
        return apiResponse(res,200,"Current User",result);
    } catch (err:any) {
        next(err);
    }
}

const logoutController = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const userId = req.user!.id;
        const result = await userSerivce.logoutUser(userId);
        res.clearCookie("refreshToken");
        return apiResponse(res,200,result,null);
    } catch (err:any) {
        next(err);
    }
}

export default {
    registerController,
    loginController,
    refreshAccessTokenController,
    logoutController,
    getCurrentUser,
}