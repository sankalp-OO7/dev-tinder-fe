import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
// Import the new ConnectionCard component
import ConnectionCard from "./ConnectionCard.jsx";

export default function Feed() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState(null);

  // Hardcode the current user's ID from the JSON data for comparison
  const currentUserId = "6900a07c40e6cc287035b16e";

  const getConnections = async () => {
    try {
      setError(null);
      const res = await axios.get(
        BASE_URL + "/userConnections/allConnections",
        {
          withCredentials: true,
        }
      );
      // Assuming the response data structure is the one provided in the prompt
      setConnections(res.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      // It's better to show a user-friendly message for the error
      setError("Failed to fetch connections. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <h1 className="text-2xl font-semibold text-indigo-600">
          Loading connections...
        </h1>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bg-red-50">
        <h1 className="text-2xl font-semibold text-red-700 p-4 rounded-lg border-2 border-red-700">
          Error: {error}
        </h1>
      </div>
    );

  const connectionList = connections?.connections || [];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        🤝 Your DevTinder Connections
      </h1>

      {/* Grid layout for responsiveness */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {connectionList.length > 0 ? (
          connectionList.map((connection) => (
            <ConnectionCard
              key={connection._id}
              connection={connection}
              currentUserId={currentUserId}
            />
          ))
        ) : (
          <div className="col-span-full text-center p-10 bg-white rounded-xl shadow-lg">
            <p className="text-xl text-gray-500">
              You don't have any accepted connections yet. Keep swiping!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
