import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://well-ness-hubbackend.vercel.app";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const { token } = useContext(AuthContext);

  const [mySessions, setMySessions] = useState([]);
  const [allSessions, setAllSessions] = useState([]);

  const getAll = async () => {
    try {
      const { data } = await axios.get("/api/session/all");
      if (data.success) {
        setAllSessions(data.sessions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMySessions = async () => {
    try {
      const { data } = await axios.get("/api/session/mySessions", {
        headers: { token },
      });
      if (data.success) {
        setMySessions(data.sessions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createSession = async (body) => {
    try {
      const res = await axios.post("/api/session/create", body, {
        headers: { token },
      });
      if (res.data.success) {
        setMySessions((prev) => [...prev, res.data.session]);
        setAllSessions((prev) => [...prev, res.data.session]);
        return res.data
      }
    } catch (error) {
      console.log(error);
    }
  };


  const getSessionById = async (id) => {
  try {
    const res = await axios.get(`/api/session/get/${id}`);
    return res.data;
  } catch (err) {
    console.log(err)
    return null;
  }
};

// context/SessionContext.js

const deleteSession = async (id) => {
  try {
    const res = await axios.delete(`/api/session/${id}`);
    toast.success("Session deleted");
    setMySessions((prev) => prev.filter((s) => s._id !== id));
  } catch (err) {
    toast.error("Failed to delete session");
  }
};


const updateSession = async (id, body) => {
  try {
    const { data } = await axios.put(
      `/api/session/update/${id}`,  
      body,
      { headers: { token } }
    );
    if (data.success) {
      setMySessions((prev) => prev.map((s) => s._id === body._id ? data.session : s));
      setAllSessions((prev) => prev.map((s) => s._id === body._id ? data.session : s));
      toast.success("Updated successfully");
    }
  } catch (error) {
    console.log("Update error:", error);
    toast.error("Failed to update session");
  }
};


useEffect(()=>{
  getAll()
  if(token)
  getMySessions()
},[])


  const value = {
    allSessions,
    mySessions,
    getAll,
    getMySessions,
    createSession,
    getSessionById,
    deleteSession,
    updateSession
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
