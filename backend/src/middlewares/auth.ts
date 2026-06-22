import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError.js";
import { verifyAccessToken } from "../utils/token.js";

export const auth = async(
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new ApiError(401,"Unauthorized");
        }
        const token = authHeader.split(" ")[1];
        if(!token){
            throw new ApiError(401,"Unauthorized");
        }
        const decodedToken = await verifyAccessToken(token);
        req.user = decodedToken;
        next();
    } catch (err:any) {
        next(err);
    }
}