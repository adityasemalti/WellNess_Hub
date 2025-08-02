import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
export const AuthContext = createContext()
axios.defaults.baseURL="https://well-ness-hubbackend.vercel.app";



export const AuthProvider = ({children})=>{
    const [authUser, setAuthUser ]= useState(null)
    const [token, setToken] = useState(localStorage.getItem("token"))


    const checkAuth = async()=>{
        try {
            const {data} = await axios.get("/api/auth/check")
            if(data.success){
                setAuthUser(data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const signUp = async (body) => {
  try {
    const { data } = await axios.post("/api/auth/signup", body);
    if (data.success) {
      setAuthUser(data.userData);
      setToken(data.token);
      localStorage.setItem("token", data.token);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || "Signup failed");
    console.error("Signup Error:", error);
  }
};


    const logout = () => {
    setAuthUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logged out");
  };

    const login = async (body) => {
    try {
        const { data } = await axios.post("/api/auth/login", body);
        if (data.success) {
            setAuthUser(data.userData);
            setToken(data.token);
            localStorage.setItem("token", data.token);
            toast.success(data.message);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || "Login failed");
    }
}

    
    useEffect(() => {
    if (token) {
        axios.defaults.headers.common["token"] = token;
        checkAuth(); 
    }
}, [token]);

    const value = {
        token,
        authUser,
        signUp,
        login,
        logout,
        axios
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
