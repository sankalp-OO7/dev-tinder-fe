import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import axios from "axios";
import { loginSuccess } from "../redux/authSlice/authSlice";

const genderOptions = ["male", "female", "other"];

const Profile = () => {
  const user = useSelector((store) => store.auth.user, shallowEqual);
  const dispatch = useDispatch();

  // ✅ Add null check and initialize with empty values
  const [profile, setProfile] = useState({
    name: "",
    age: 20,
    gender: "",
    skills: [],
    fotoURL: "",
    hobbies: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Initialize profile when user data is available
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        gender: user.gender || "",
        skills: Array.isArray(user.skills) ? user.skills : [],
        fotoURL: user.fotoURL || "",
        hobbies: Array.isArray(user.hobbies) ? user.hobbies : [],
      });
    }
  }, [user]);

  const handleChange = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Handle tag input for skills & hobbies
  const handleKeyDown = (e, key) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      const value = e.target.value.trim();
      setProfile((prev) => {
        if (prev[key].length >= 6) return prev; // limit 6
        if (prev[key].includes(value)) return prev; // no duplicates
        return { ...prev, [key]: [...prev[key], value] };
      });
      e.target.value = "";
    }
  };

  const removeItem = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: prev[key].filter((item) => item !== value),
    }));
  };

  // ✅ Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.patch(
        "http://localhost:3000/userInfo/updateProfile/6900a07c40e6cc287035b16e",
        profile,
        { withCredentials: true }
      );
      setMessage("✅ Profile updated successfully!");
      dispatch(loginSuccess(res.data.updatedUser));
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("❌ Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Show loading or empty state while user data is not available
  if (!user) {
    return (
      <div className="flex items-center justify-center bg-gray-100 pt-10">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Loading Profile...
          </h2>
          <p className="text-gray-600">
            Please wait while we load your profile data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 pt-10">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit}>
          {/* ✅ Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleChange("name", e.target.value)}
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Age
            </label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => handleChange("age", e.target.value)}
              id="age"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your age"
            />
          </div>

          {/* ✅ Gender dropdown */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Gender
            </label>
            <select
              id="gender"
              value={profile.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            >
              <option value="">Select gender</option>
              {genderOptions.map((g) => (
                <option key={g} value={g}>
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Skills (tag-style input) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Skills (max 6)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeItem("skills", skill)}
                    className="ml-1 text-blue-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              onKeyDown={(e) => handleKeyDown(e, "skills")}
              placeholder="Type a skill and press Enter"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* ✅ Hobbies (tag-style input) */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Hobbies (max 6)
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {profile.hobbies.map((hobby, i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm flex items-center"
                >
                  {hobby}
                  <button
                    type="button"
                    onClick={() => removeItem("hobbies", hobby)}
                    className="ml-1 text-green-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              onKeyDown={(e) => handleKeyDown(e, "hobbies")}
              placeholder="Type a hobby and press Enter"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* ✅ Photo URL */}
          <div className="mb-4">
            <label
              htmlFor="fotoURL"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Photo URL
            </label>
            <input
              type="text"
              id="fotoURL"
              value={profile.fotoURL}
              onChange={(e) => handleChange("fotoURL", e.target.value)}
              placeholder="Enter photo URL"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {profile.fotoURL && (
            <div className="mb-4 text-center">
              <img
                src={profile.fotoURL}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full mx-auto border"
              />
            </div>
          )}

          {message && (
            <p
              className={`text-center mb-4 font-semibold ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
