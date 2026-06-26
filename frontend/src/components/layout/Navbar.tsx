import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const {user} = useAuth();
return ( 
    <nav className="h-16 bg-[#0F1720] border-b border-[#2A3B4A] flex items-center justify-between px-6">

        {/* Logo */}
        <Link to="/home">
            <h1 className="text-2xl font-bold text-white">
                Face<span className="text-[#077A7D]">Tube</span>
            </h1>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-10">
            <input
                type="text"
                placeholder="Search videos..."
                className="w-full bg-[#090D12] text-white border border-[#2A3B4A] rounded-full px-4 py-2 outline-none focus:border-[#077A7D]"
            />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

            <button
                className="bg-[#077A7D] hover:bg-[#06686A] text-white px-4 py-2 rounded-lg transition-colors"
                onClick={() => navigate("/upload")}
            >
                Upload
            </button>

            <div className="w-10 h-10 rounded-full bg-[#077A7D] flex items-center justify-center text-white font-semibold">
                {user?.username?.slice(0,1).toUpperCase() ?? "?"}
            </div>

        </div>

    </nav>
)};