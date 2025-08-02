import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";
import toast from "react-hot-toast";

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { updateSession, getSessionById } = useContext(SessionContext);

    const [session, setSession] = useState(null);

    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState("");
    const [steps, setSteps] = useState("");
    const [image, setImage] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchSession = async () => {
            const data = await getSessionById(id);
            setSession(data?.session);
        };
        if (id) fetchSession();
    }, [id, getSessionById]);

    useEffect(() => {
        if (session) {
            setTitle(session.title || "");
            setTags(session.tags?.join(", ") || "");
            setHeading(session.content?.heading || "");
            setDescription(session.content?.description || "");
            setDuration(session.content?.duration || "");
            setSteps(session.content?.steps?.join("\n") || "");
            setImage(session.image || "");
            setStatus(session.status || "");
        }
    }, [session]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleUpdate = async (e) => {
        try {
            e.preventDefault();

            const sessionData = {
                _id: id, // important for updateSession to identify which one to update
                title,
                tags: tags.split(",").map((tag) => tag.trim()),
                content: {
                    heading,
                    description,
                    duration,
                    steps: steps.split("\n").map((s) => s.trim()).filter(Boolean),
                },
                image: image,
                status,
            };

            const success = await updateSession(id, sessionData);
            if (success) {
                navigate(`/view/${id}`);
                toast.success("Session Updated!");

            }
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Wellness Session</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
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
                {image && (
                    <img
                        src={image}
                        alt="Preview"
                        className="w-32 h-32 object-cover mt-2 rounded"
                    />
                )}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                >
                    Update Session
                </button>
            </form>
        </div>
    );
};

export default Update;
