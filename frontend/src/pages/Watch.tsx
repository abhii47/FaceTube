import { useParams } from "react-router-dom";
import { fetchVideo } from "../api/client";
import type { Video } from "../types";
import { useEffect, useState } from "react";

const Watch = () => {
    const {videoId} = useParams();
    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadVideo = async():Promise<void> => {
            try {
                const data = await fetchVideo(videoId as string);
                setVideo(data);
            } catch (err:any) {
                console.log(err);
            }finally{
                setLoading(false);
            }
        }
        loadVideo();
    },[videoId]);

    if(loading) return <div className="text-white p-8">Loading...</div>;
    if(!video) return <div className="text-white p-8">Video not found</div>;
    
    return (
        <div>
            <video src={video?.video_url} controls></video>
        </div>
    )
}

export default Watch;