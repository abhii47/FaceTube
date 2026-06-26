import { useState } from "react";
import { Eye } from "lucide-react";
import type { Video } from "../../types";
import { useNavigate } from "react-router-dom";

type Props = {
    video: Video;
};

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const VideoCard = ({ video }: Props) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleVideoClick = () => {
        navigate(`/watch/${video.video_id}`);
    }

    return (
        <div
            className="bg-[#183D3D]/40 hover:bg-[#183D3D]/60 rounded-xl overflow-hidden pb-4 flex flex-col gap-3 cursor-pointer group transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleVideoClick}
        >
            {/* Thumbnail / Video Area */}
            <div className="relative w-full aspect-video overflow-hidden">
                {isHovered ? (
                    <video
                        src={`${backendUrl}${video.video_url}`}
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    <img
                        src={`${backendUrl}${video.thumbnail_url}`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                )}
            </div>

            {/* Info Area */}
            <div className="flex gap-3 items-start px-3 font-mono">
                <img
                    src={
                        video.uploader.avatar_url ??
                        "https://placehold.co/40X40/183D3D/FFFFFF?text=U"
                    }
                    className="w-9 h-9 rounded-full mt-0.5 object-cover flex-shrink-0"
                />

                <div className="flex flex-col w-full">
                    <h3 className="text-[#F1F1F1] text-base font-semibold line-clamp-2 leading-tight mb-1">
                        {video.title}
                    </h3>
                    {/* <button className="text-[#AAAAAA] text-sm flex items-center gap-1">
                        <PlayCircle size={20} color="beige" />
                    </button> */}

                    <div className="flex items-center gap-2 justify-between">
                        <p className="text-[#AAAAAA] text-sm hover:text-white transition-colors">
                            {video.uploader.username ?? "Unknown" }
                        </p>

                        <p className="text-[#AAAAAA] text-sm flex items-center gap-1">
                            <Eye size={14} />
                            {video.view_count}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};