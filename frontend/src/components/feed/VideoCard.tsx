import type { Video } from "../../types";

type Props = {
    video: Video;
};

export const VideoCard = ({ video }: Props) => {
    return (
        <div className="bg-[#183D3D] rounded-xl overflow-hidden cursor-pointer hover:scale-[1.02] transition-all duration-200">

            <img
                src={video.thumbnail_url}
                alt={video.title}
                className="w-full h-52 object-cover"
            />

            <div className="p-4 flex gap-3">

                <img
                    src={
                        video.uploader.avatar_url ??
                        "https://placehold.co/40"
                    }
                    alt=""
                    className="w-10 h-10 rounded-full"
                />

                <div>
                    <h3 className="text-[#EAEAEA] font-medium line-clamp-2">
                        {video.title}
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">
                        {video.uploader.username}
                    </p>

                    <p className="text-gray-500 text-xs">
                        {video.view_count} views
                    </p>
                </div>

            </div>
        </div>
    );
};