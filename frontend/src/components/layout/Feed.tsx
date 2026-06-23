import { useState,useEffect } from "react";
import { fetchVideos } from "../../api/client";
import type { Video } from "../../types";
import { FeedSkeleton } from "../feed/FeedSkeleton";
import { VideoCard } from "../feed/VideoCard";

export const Feed = () => {
    const [videos, setVideos] = useState<Video[] | []>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchVideosData = async () => {
            try {
                const response = await fetchVideos();
                setVideos(response);
            } catch (err:any) {
                console.error(err);
            }finally{
                setLoading(false);
            }
        }
        fetchVideosData();
    }, []);

    if(loading){
        return <FeedSkeleton />;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            {videos.map((video) => (
                <VideoCard 
                    key={video.video_id}
                    video={video}
                />
            ))}
        </div>
    )
}