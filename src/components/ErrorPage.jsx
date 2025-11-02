import React from "react";
import { Link } from "react-router";
import Button from "@mui/material/Button";

export default function ErrorPage() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          fontSize: "24px",
          height: "auto",
          alignItems: "center",
          paddingTop: "50px",
          justifyContent: "center",
        }}
      >
        <Link to="/">
          {" "}
          <Button variant="outlined">Home</Button>
        </Link>
        <img
          src="https://media.istockphoto.com/id/486150666/photo/404-error.jpg?s=612x612&w=0&k=20&c=0gyIrlpbS04D0S0d9ED_2tjE3-L5lMnVamyuohZ8TKQ="
          alt="404- Image not found"
        />
      </div>
    </div>
  );
}
