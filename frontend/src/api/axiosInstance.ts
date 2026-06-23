import axios from "axios";

const axiosInstance = axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    timeout:10000,
    withCredentials:true,
    headers:{
        "Content-Type":"application/json"
    }
});

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem("accessToken");
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use((response) => response,
   async(error) => {
    const originalRequest = error.config;
    if(originalRequest.url?.includes("users/login") ||
        originalRequest.url?.includes("users/refresh")
    ){
        return Promise.reject(error);
    }
    
    if(error.response?.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        try{
            const {data} = await axiosInstance.post("/users/refresh");
            localStorage.setItem("accessToken",data.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
            return axiosInstance(originalRequest);
        }catch(refreshError){
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
   } 
);

export default axiosInstance;