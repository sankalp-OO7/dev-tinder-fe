import React from "react";
import useFeedData from "../hooks/useFeedData";
import UserCard from "./UserCard.jsx";
import { useSelector } from "react-redux";

export default function Feed() {
  const { loading, error } = useFeedData();

  const feed = useSelector((store) => store.feed.feedData) || [];

  if (loading) return <div>Loading…</div>;

  if (error) return <div>Error: {error.message || String(error)}</div>;

  if (feed.length === 0)
    return <div>No new developers found in your area!</div>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <UserCard feed={feed} />
    </div>
  );
}
