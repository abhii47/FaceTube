import type { RegisterData, Video } from "../types";
import axiosInstance from "./axiosInstance";

export const register = async(payload:RegisterData) => {
    const res = await axiosInstance.post("users/register",payload);
    return res.data;
}

export const fetchVideos = async():Promise<Video[] | []> => {
    const res = await axiosInstance.get("/videos");
    return res.data.data.videos;    
}