import { Link, useLocation } from "react-router-dom";
import {
Video,
User,
Upload,
StepForward
} from "lucide-react";

export const Sidebar = () => {
const location = useLocation();
const menuItems = [
    {
        name: "Feed",
        icon: StepForward,
        path: "/home"
    },
    {
        name: "Videos",
        icon: Video,
        path: "/home/videos"
    },
    {
        name: "Upload",
        icon: Upload,
        path: "/home/upload"
    },
    {
        name: "Profile",
        icon: User,
        path: "/home/profile"
    }
];

return (
    <aside className="w-44 bg-[#111827] border-r border-[#2A3B4A]">

        <div className="flex flex-col p-4 gap-2">
            {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg 
                            transition-colors text-sm font-semibold font-mono
                             ${
                                location.pathname === item.path
                                    ? "bg-[#077A7D] text-white"
                                    : "text-gray-300 hover:bg-[#183D3D]"
                            }
                        `}
                    >
                        <Icon size={16} />
                        <span>{item.name}</span>
                    </Link>
                );
            })}

        </div>

    </aside>
)};
