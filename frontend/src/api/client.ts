import type { RegisterData, Video } from "../types";
import axiosInstance from "./axiosInstance";

export const register = async(payload:RegisterData) => {
    const res = await axiosInstance.post("/users/register",payload);
    return res.data;
}

export const fetchVideos = async():Promise<Video[] | []> => {
    const res = await axiosInstance.get("/videos");
    return res.data.data.videos;    
}

export const fetchVideo = async(videoId:string) => {
    const res = await axiosInstance.get(`/videos/${videoId}`);
    return res.data.data;
}

export const fetchMyVideos = async() => {
    const res = await axiosInstance.get("/videos/my-videos");
    return res.data.data;
}