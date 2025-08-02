import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SessionContext } from "../context/SessionContext";

const SessionViewer = () => {
  const { getSessionById } = useContext(SessionContext);
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSessionById(id);
        if (!data?.session) throw new Error("Session not found");
        setSession(data.session);
      } catch (err) {
        setError(err.message || "Failed to load session");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchSession();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 text-gray-500">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
        <span className="ml-3">Loading session...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-red-100 text-red-700 font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-white py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">{session.title}</h1>

        {/* Main Image */}
        {session.image && (
          <div className="mb-6">
            <img
              src={session.image}
              alt={`Cover image for ${session.title}`}
              className="w-full max-w-[500px] mx-auto my-10 h-64 object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        {/* Tags */}
        {Array.isArray(session.tags) && session.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {session.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-indigo-100 text-indigo-800 text-sm font-semibold px-4 py-1 rounded-full shadow"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Content */}
        {session.content && typeof session.content === "object" && (
  <div className="mb-8 bg-gray-50 p-6 rounded-2xl shadow-inner">
    <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
      📑 Session Details
    </h2>
    <div className="grid sm:grid-cols-2 gap-6">
      {Object.entries(session.content)
        .filter(([key]) => !["_id", "__v"].includes(key))
        .map(([key, value]) => (
          <div
            key={key}
            className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md"
          >
            <h3 className="text-sm text-gray-500 uppercase tracking-wide mb-1">
              {key.replace(/([A-Z])/g, " $1").toUpperCase()}
            </h3>
            {Array.isArray(value) ? (
              // Agar array hai, to list dikhao
              <ol className="list-decimal list-inside space-y-1 text-gray-800 font-medium">
                {value.map((item, idx) => (
                  <li key={idx} className="whitespace-pre-wrap break-words">
                    {typeof item === "object" ? JSON.stringify(item) : item}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-gray-800 font-medium whitespace-pre-wrap break-words">
                {typeof value === "object"
                  ? JSON.stringify(value, null, 2)
                  : key.toLowerCase().includes("date")
                  ? new Date(value).toLocaleString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : String(value)}
              </p>
            )}
          </div>
        ))}
    </div>
  </div>
)}


        {/* Footer Info */}
        <div className="border-t pt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <span>🕒 Created: {new Date(session.createdAt).toLocaleString()}</span>
          {session.updatedAt && (
            <span>🛠 Updated: {new Date(session.updatedAt).toLocaleString()}</span>
          )}
          <span>Status: <strong>{session.status}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default SessionViewer;
