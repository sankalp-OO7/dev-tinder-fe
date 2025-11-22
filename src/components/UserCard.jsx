import React from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { deleteFeedItem } from "../redux/feedSlice";

export default function UserCard(data) {
  const dispatch = useDispatch();
  const { feed } = data;
  //      .select(" name     gender email  hobbies fotoURL skills  ")
  const handleRequest = async (status, toUserId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connectionRequest/" + status + "/" + toUserId,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(deleteFeedItem(toUserId));
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignContent: "center",

        padding: "20px",
      }}
    >
      {feed.map((e) => {
        return (
          <div
            key={e._id}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 p-2 m-2"
          >
            <div>
              <img className="rounded-t-lg" src={e.fotoURL} alt="guy foto" />
            </div>
            <div className="p-5">
              <section>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {e.name}
                </h5>
              </section>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Gender : {e.gender}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Age : {e.age}
              </p>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Hobbies : {e.hobbies.join(",")}
              </p>

              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Skills : {e.skills.join(",")}
              </p>
              <button
                onClick={() => handleRequest("intrested", e._id)}
                className="inline-flex items-center mx-2 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Intrested
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleRequest("ignored", e._id)}
                className="inline-flex items-center m-2 px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
              >
                Ignore
                <svg
                  className="rtl:rotate-0 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
