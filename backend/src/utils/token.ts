import jwt, { JwtPayload } from "jsonwebtoken";
import ApiError from "./apiError.js";

type Payload = {
    id:number;
}

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

if (!ACCESS_SECRET || !REFRESH_SECRET) {
    throw new Error("JWT_ACCESS_SECRET or JWT_REFRESH_SECRET is not defined");
}

const ACCESS_EXPIRY = Number(process.env.ACCESS_TOKEN_EXPIRY) || "15m";
const REFRESH_EXPIRY = Number(process.env.REFRESH_TOKEN_EXPIRY) || "7d";


export const generateTokens = async(payload:Payload) => {
    const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY });
    return { accessToken, refreshToken }; 
}

export const verifyAccessToken = async(token:string) => {
    if(!token){
        throw new ApiError(401,"Token is required");
    }
    const decodeToken = jwt.verify(token, ACCESS_SECRET) as JwtPayload;
    return decodeToken;
}

export const verifyRefreshToken = async(token:string) => {
    if(!token){
        throw new ApiError(401,"Token is required");
    }
    const decodeToken = jwt.verify(token, REFRESH_SECRET) as JwtPayload;
    return decodeToken;
}