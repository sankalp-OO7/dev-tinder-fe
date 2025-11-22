import React from "react";

// Helper function to capitalize the first letter of a string
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Helper component for displaying tags (Skills or Hobbies)
const Tag = ({ text }) => (
  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
    {text}
  </span>
);

export default function ConnectionCard({ connection, currentUserId }) {
  // Determine who the *other* user is in the connection
  const otherUser =
    connection.fromUserId._id === currentUserId
      ? connection.toUserId
      : connection.fromUserId;
  console.log(otherUser);

  // Destructure for easier access
  const { name, fotoURL, gender, skills, hobbies, age } = otherUser;

  const statusColor =
    connection.status === "accepted" ? "bg-green-500" : "bg-yellow-500";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 ease-in-out hover:shadow-2xl">
      {/* Header with Profile Image */}
      <div className="relative p-6">
        <div className="flex justify-center -mt-16">
          <img
            className="w-32 h-32 mt-14 object-cover rounded-full border-4 border-white shadow-xl"
            src={
              fotoURL && fotoURL !== "https://defaultfoto.com/image.png"
                ? fotoURL
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCHnBLMnZw88CJ46qNOW_avvtON2a2xWkfPFu6jBYwuNaRUGfZqm3g174pEhkaVFjZb30&usqp=CAU"
            } // Placeholder if fotoURL is default or empty
            alt={`Profile of ${name}`}
          />
        </div>

        {/* Connection Status Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full text-white ${statusColor}`}
          >
            {capitalize(connection.status)}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 pt-0 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mt-2">{name}</h2>

        <p className="text-sm text-gray-500 mb-4">
          <span className="font-semibold">{capitalize(gender)}</span>
          <span className="font-semibold">{age}</span>
        </p>

        {/* Skills Section */}
        <div className="text-left mb-4">
          <h3 className="text-lg font-bold text-gray-700 mb-2 border-b pb-1">
            ⚙️ Skills
          </h3>
          <div className="flex flex-wrap">
            {skills && skills.length > 0 ? (
              skills.map((skill, index) => (
                <Tag key={index} text={capitalize(skill)} />
              ))
            ) : (
              <p className="text-gray-400 text-sm">No skills listed</p>
            )}
          </div>
        </div>

        {/* Hobbies Section */}
        <div className="text-left">
          <h3 className="text-lg font-bold text-gray-700 mb-2 border-b pb-1">
            🎨 Hobbies
          </h3>
          <div className="flex flex-wrap">
            {hobbies && hobbies.length > 0 ? (
              hobbies.map((hobby, index) => (
                <Tag key={index} text={capitalize(hobby)} />
              ))
            ) : (
              <p className="text-gray-400 text-sm">No hobbies listed</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="p-6 border-t bg-gray-50">
        <button className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 ease-in-out">
          Message {name.split(" ")[0]}
        </button>
      </div>
    </div>
  );
}
