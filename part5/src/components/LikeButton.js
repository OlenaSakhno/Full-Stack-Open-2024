import React from "react";

const LikeButton = ({ onClick, liked }) => {
  const buttonStyles = {
    display: "inline-flex",
    alignItems: "center",
    backgroundColor: liked ? "#007bff" : "#ffffff",
    color: liked ? "#ffffff" : "#007bff",
    border: "1px solid #007bff",
    borderRadius: "4px",
    padding: "2px 2px",
    fontSize: "14px",
    cursor: "pointer",
  };

  const iconStyles = {
    marginRight: "2px",
    fontFamily: "Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "10px",
  };

  return (
    <button style={buttonStyles} onClick={onClick}>
      <span style={iconStyles}>{liked ? "❤️" : "🤍"}</span>
      <span>{liked ? "Liked" : "Like"}</span>
    </button>
  );
};

export default LikeButton;
