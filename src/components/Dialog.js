import React from "react";

const Dialog = ({ setDelDialog }) => {
  const toggleDelDialog = (e) => {
    e.preventDefault();
    setDelDialog(false);
  };
  console.log("Delete dialog");

  return (
    <div className="DialogBox">
      <div className="container">
        <p>
          Are you sure you want to delete?
          <span onClick={toggleDelDialog}>X</span>
        </p>
        <div className="buttons">
          <button onClick={toggleDelDialog}>Cancel</button>
          <button className="del" onClick={toggleDelDialog}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default Dialog;
