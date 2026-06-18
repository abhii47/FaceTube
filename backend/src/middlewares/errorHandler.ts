import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError.js";

export const errorHandler = (
    err:any,
    req:Request,
    res:Response,
    next:NextFunction
) => {
    if(err instanceof ApiError){
        return res.status(err.statusCode).json({
            success:false,
            message:err.message,
        });
    };
    if(err.name === "SequelizeValidationError"){
        return res.status(400).json({
            success:false,
            message:err.errors[0].message || "Validation Error",
        });
    }
    if(err.name === "SequelizeUniqueConstraintError"){
        return res.status(409).json({
            success:false,
            message:"Resource already exists",
        });
    }
    if(err.name === "TokenExpiredError"){
        return res.status(401).json({
            success:false,
            message:"Token Expired"
        });
    }
    if(err.name === "JsonWebTokenError"){
        return res.status(401).json({
            success:false,
            message:"Invalid Token"
        });
    }
    return res.status(500).json({
        success:false,
        message:"Something went wrong"
    });
}