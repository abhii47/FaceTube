import { useEffect, useState } from "react";
import type { Video } from "../../types";
import { fetchMyVideos } from "../../api/client";


const backendUrl = import.meta.env.VITE_BACKEND_URL;

const MyVideo = () => {
    const [videos, setVideos] = useState<Video[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const MyVideos = async() => {
            try {
                const data = await fetchMyVideos();
                setVideos(data);
            } catch (err:any) {
                console.error(err);
            } finally{
                setLoading(false);
            }
        } 
        MyVideos();
    },[]);

    if(loading){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
    return(
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {videos && videos?.map((video) => {
                    return (
                        <div key={video.video_id} className="flex flex-col gap-2">
                            <video 
                                src={`${backendUrl}${video.video_url}`} 
                                controls
                                className="w-full aspect-video bg-black rounded-lg object-cover"
                            />
                            <h3 className="text-white font-semibold line-clamp-2">{video.title}</h3>
                        </div>
                    )
                })
            }
            {videos?.length === 0 && (
                <div className="col-span-full text-white">
                    <h1>No Videos Found</h1>
                </div>
            )}
        </div>
    )
}

export default MyVideo;