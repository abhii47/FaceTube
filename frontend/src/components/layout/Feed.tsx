import { useState,useEffect } from "react";
import { fetchVideos } from "../../api/client";
import type { Video } from "../../types";
import { FeedSkeleton } from "../feed/FeedSkeleton";
import { VideoCard } from "../feed/VideoCard";
import { EmptyFeed } from "../feed/EmptyFeed";

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
    <>
        {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 p-4 md:p-6">
            {videos.map((video: Video) => (
            <VideoCard
                key={video.video_id}
                video={video}
            />
            ))}
        </div>
        ) : (
        <div className="flex items-center justify-center min-h-[70vh]">
            <EmptyFeed />
        </div>
        )}
    </>
    )
}