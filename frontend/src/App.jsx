import Login from "./pages/Login";
import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import { AuthContext } from "./context/AuthContext";
import CreateSession from "./pages/CreateSession";
import SessionViewer from "./components/SessionViewer";
import Update from "./pages/Update";

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/create"
          element={authUser ? <CreateSession /> : <Navigate to="/login" />}
        />
        <Route path="/view/:id" element={<SessionViewer />} />
        <Route
          path="/update/:id"
          element={authUser ? <Update /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
