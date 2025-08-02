import React, { useState, useContext } from "react";
import { SessionContext } from "../context/SessionContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import temp from "../assets/temp.jpg";

const CreateSession = () => {
  const { createSession, mySessions, deleteSession } = useContext(SessionContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [steps, setSteps] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [status, setStatus] = useState("draft");

  const [showForm, setShowForm] = useState(false); // modal toggle

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setMainImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !tags || !heading || !description || !duration || !steps) {
      return toast.error("Please fill all required fields.");
    }

    const sessionData = {
      title,
      tags: tags.split(",").map((tag) => tag.trim()),
      content: {
        heading,
        description,
        duration,
        steps: steps.split("\n").map((s) => s.trim()).filter(Boolean),
      },
      image: mainImage,
      status,
    };

    const success = await createSession(sessionData);
    if (success) {
      toast.success("Session Created!");
      setShowForm(false); // close modal
      navigate(`/view/${success.session?._id}`);
    }
  };

  return (
    <>
    <div className="w-full relative px-4 sm:px-6">
    <h1 className="text-2xl sm:text-3xl font-bold pt-5">
      Your{" "}
      <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Sessions
      </span>
    </h1>

    {/* New Session Button */}
    <div className="absolute top-5 right-5">
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm sm:text-base"
        onClick={() => setShowForm(true)}
      >
        + New Session
      </button>
    </div>

    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
      {mySessions && mySessions.length > 0 ? (
        mySessions.map((item, index) => (
          <div
            key={index}
            className="bg-white w-[350px] sm:w-[360px] mx-auto shadow-md rounded-xl overflow-hidden transform transition-transform hover:scale-105"
          >
            <img
              src={item.image || temp}
              alt="session"
              className="w-full h-52 object-cover cursor-pointer"
              onClick={() => navigate(`/view/${item._id}`)}
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800 mb-2 text-center">
                {item.title}
              </h3>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-4">
                <button
                  className="px-3 py-1 rounded-lg bg-blue-500 text-white active:scale-95 duration-300 w-full sm:w-auto"
                  onClick={() => navigate(`/update/${item._id}`)}
                >
                  Update
                </button>
                <button
                  className="px-3 py-1 rounded-lg bg-red-500 text-white active:scale-95 duration-300 w-full sm:w-auto"
                  onClick={() => deleteSession(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No sessions available yet.</p>
      )}
    </div>
  </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
          <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-6 relative">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Create Wellness Session
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                className="w-full p-2 border border-gray-300 rounded"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <input
                type="text"
                placeholder="Heading"
                className="w-full p-2 border border-gray-300 rounded"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
              <input
                type="text"
                placeholder="Duration (e.g., 30 mins)"
                className="w-full p-2 border border-gray-300 rounded"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <textarea
                placeholder="Steps (each step in new line)"
                className="w-full p-2 border border-gray-300 rounded"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                rows={5}
              />
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded"
                onChange={handleImageUpload}
              />
              {mainImage && (
                <img
                  src={mainImage}
                  alt="Preview"
                  className="w-32 h-32 object-cover mt-2 rounded"
                />
              )}

              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  className="w-full bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                >
                  Create Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateSession;
