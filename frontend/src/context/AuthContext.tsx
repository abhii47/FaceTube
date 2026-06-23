import { createContext, useContext, useState } from "react";
import type { LoginData, User } from "../types";
import axiosInstance from "../api/axiosInstance";

type AuthContextType = {
    user:User | null;
    accessToken:string | null;
    isAuthenticated:boolean;
    login:(payload:LoginData) => Promise<void>;
    logout: () => Promise<void>;

}
const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const isAuthenticated = user !== null;
    
    const login = async (payload:LoginData) => {
        try{
            const response = await axiosInstance.post("/users/login",payload);
            const {data} = response.data;
            localStorage.setItem("accessToken",data.accessToken);
            setUser(data.safeUser);
            setAccessToken(data.accessToken);
        }catch(error){
            console.error("Error logging in:",error);
            throw error;
        }
    }
    const logout = async () => {
        try{
            await axiosInstance.post("/users/logout");
            localStorage.removeItem("accessToken");
            setUser(null);
            setAccessToken(null);
        }catch(error){
            console.error("Error logging out:",error);
            throw error;
        }
    }
    return(
        <AuthContext.Provider value={{user,accessToken,isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}