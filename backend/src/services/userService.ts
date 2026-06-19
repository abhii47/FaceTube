import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import ApiError from "../utils/apiError.js";
import { generateTokens, verifyRefreshToken } from "../utils/token.js";

type RegUserPayload = {
    username:string;
    email:string;
    password:string;
}
type LoginUserPayload = {
    email:string;
    password:string;
}

const registerUser = async (payload:RegUserPayload) => {
    const {username,email,password} = payload;
    if(!username || !email || !password){
        throw new ApiError(400,"All Fields Are Required");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password:hashedPassword
    });

    const { password:_, refresh_token:__, ...safeUser } = user.toJSON();
    return safeUser;
}

const loginUser = async (payload:LoginUserPayload) => {
    const {email,password} = payload;
    if(!email || !password){
        throw new ApiError(400,"All Fields Are Required");
    }
    const user = await User.findOne({where:{email}});
    if(!user){
        throw new ApiError(401,"Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        throw new ApiError(401,"Invalid Credentials");
    }

    const tokens = await generateTokens({id:user.user_id});
    user.refresh_token = tokens.refreshToken;
    await user.save();
        
    const { password:_, refresh_token:__, ...safeUser } = user.toJSON();
    return {
        safeUser,
        accessToken:tokens.accessToken,
        refreshToken:tokens.refreshToken
    };
}

const refreshAccessToken = async (refreshToken:string) => {
    if(!refreshToken){
        throw new ApiError(401,"Refresh Token is required");
    }
    const decodedToken = await verifyRefreshToken(refreshToken);
    const userId = decodedToken.id;
    const user = await User.findOne({where:{user_id:userId}});
    if(!user || user.refresh_token !== refreshToken){
        throw new ApiError(401,"Invalid Refresh Token");
    }

    const tokens = await generateTokens({id:user.user_id});
    user.refresh_token = tokens.refreshToken;
    await user.save();

    const { password:_, refresh_token:__, ...safeUser } = user.toJSON();
    return {
        safeUser,
        accessToken:tokens.accessToken,
        refreshToken:tokens.refreshToken
    };

}

const logoutUser = async(userId:number) => {
    if(!userId){
        throw new ApiError(400,"User ID is required");
    }
    const user = await User.findByPk(userId);
    if(user && user.refresh_token !== null){
        user.refresh_token = null;
        await user.save();
        return "User Logged Out Successfully";
    }
    return "User Already Logged Out";
}

export default {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser
}