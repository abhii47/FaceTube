import { Outlet } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";

const Home = () => {
    return(
        <div className="h-screen flex flex-col bg-[#090D12]">
            {/* Fixed Navbar at the top */}
            <Navbar />
            
            {/* Main Content Area */}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Home;