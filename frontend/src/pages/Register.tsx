import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/client";


export const Register = () => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();


    const handleRegister = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try{
            await register({
                username,
                email,
                password
            })
            navigate("/login");
        }catch(err){
            setError("Invalid email or password. Please try again.");
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-[#090D12]">
            <div className="w-full max-w-md bg-[#183D3D] rounded-2xl p-8 shadow-lg">

                {/* Logo */}
                <h1 className="text-3xl font-bold text-white text-center mb-8">
                    Face<span className="text-[#077A7D]">Tube</span>
                </h1>

                <form onSubmit={handleRegister} className="flex flex-col gap-5">

                    {/* Error Message */}
                    {error && 
                        (<p className="text-red-500 text-sm">{error}</p>
                    )}

                    {/* Username Input */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="username" className="text-[#EAEAEA] text-sm">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Enter your username"
                            className="bg-[#090D12] text-white border border-[#EAEAEA] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#077A7D] transition-colors"
                        />                    
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-[#EAEAEA] text-sm">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                            className="bg-[#090D12] text-white border border-[#EAEAEA] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#077A7D] transition-colors"
                        />                    
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-[#EAEAEA] text-sm">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                            className="bg-[#090D12] text-white border border-[#EAEAEA] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#077A7D] transition-colors"
                        />                    
                    </div>

                    {/* Register Button */}
                    <button 
                        type="submit"
                        disabled={loading}
                        className="bg-[#077A7D] text-white font-semibold py-2.5 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>

                    {/* Register link */}
                    <p className="text-[#EAEAEA] text-sm text-center">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#077A7D] hover:underline">
                            Login
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    )
}