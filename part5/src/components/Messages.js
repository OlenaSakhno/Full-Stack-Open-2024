import React from "react";
import "./index.css";

export const SuccessMessage = ({ message }) => {
  return (
    <div className="message success">
      <p>{message}</p>
    </div>
  );
};

export const ErrorMessage = ({ message }) => {
    return (
      <div className="message error">
        <p>{message}</p>
      </div>
    );
  };