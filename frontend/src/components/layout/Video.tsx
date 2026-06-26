import { useEffect, useState } from "react";
import type { Video } from "../../types";
import { deleteMyVideo, fetchMyVideos } from "../../api/client";
import { Eye, Trash2 } from "lucide-react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const MyVideo = () => {
    const [videos, setVideos] = useState<Video[] | null>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const handleDelete = async(videoId:number) => {
        try {
            const res = await deleteMyVideo(videoId);
            if(res){
                alert("Video deleted successfully");
            }
        } catch (err) {
            alert("Failed to delete video");
        }
    }
    
    useEffect(() => {
        const fetchVideos = async() => {
            try {
                const data = await fetchMyVideos();
                setVideos(data);
            } catch (err:any) {
                console.error(err);
            } finally{
                setLoading(false);
            }
        } 
        fetchVideos();
    },[videos]);

    if(loading){
        return (
            <div className="p-4 text-white font-mono">
                <h1>Loading...</h1>
            </div>
        )
    }
    
    return(
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {videos && videos.map((video) => (
                <div key={video.video_id} className="bg-[#183D3D]/40 hover:bg-[#183D3D]/60 rounded-xl overflow-hidden flex flex-col transition-colors">
                    <video 
                        src={`${backendUrl}${video.video_url}`} 
                        poster={video.thumbnail_url ? `${backendUrl}${video.thumbnail_url}` : undefined}
                        controls
                        className="w-full aspect-video bg-black object-cover"
                    />
                    <div className="p-4 flex flex-col flex-1 gap-2">
                        <h3 className="text-[#F1F1F1] font-semibold line-clamp-2">{video.title}</h3>
                        {video.description && (
                            <p className="text-gray-400 text-sm line-clamp-3">{video.description}</p>
                        )}
                        <div className="mt-auto pt-1 flex justify-between items-center">
                            <span className="text-sm text-gray-500 flex items-center gap-1"><Eye size={16} />{video.view_count} </span>
                            <button 
                                onClick={() => handleDelete(video.video_id)}
                                className="flex items-center gap-1 text-sm bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors"
                            >
                                <Trash2 size={14} />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            
            {(!videos || videos.length === 0) && (
                <div className="col-span-full text-white font-mono text-center mt-10">
                    <h1 className="text-xl">No Videos Found</h1>
                    <p className="text-gray-400 mt-2">Upload some videos to see them here.</p>
                </div>
            )}
        </div>
    )
}

export default MyVideo;