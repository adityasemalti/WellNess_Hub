import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import { SessionContext } from '../context/SessionContext';
import temp from '../assets/temp.jpg';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { authUser } = useContext(AuthContext);
  const { getAll, allSessions } = useContext(SessionContext);
  const navigate = useNavigate();

  useEffect(() => {
    getAll();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50">
      <Navbar />

      <div className="px-4 sm:px-6 py-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-700">Hello {authUser?.name || "Guest"}</h1>
        <h1 className="text-3xl sm:text-4xl font-bold mt-1">
          Welcome to the{" "}
          <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
            Wellness Hub
          </span>
        </h1>
      </div>

      <div className="px-4 sm:px-6 mt-6 sm:mt-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700">Explore Sessions</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {allSessions && allSessions.length > 0 ? (
            allSessions.map((item, index) => (
              <div
                key={index}
                className="bg-white w-full max-w-sm mx-auto shadow-md rounded-xl overflow-hidden transform transition-transform hover:scale-105 cursor-pointer"
                onClick={() => navigate(`/view/${item._id}`)}
              >
                <img
                  src={item.image || temp}
                  alt="session"
                  className="w-full h-52 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 text-center">{item.title}</h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No sessions available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
