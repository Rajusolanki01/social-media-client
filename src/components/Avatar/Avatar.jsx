import React from "react";
import "./Avatar.scss";
import userImg from "../../assests/account.png";

function Avatar({ src }) {
  return (
    <div className="Avatar">
      <img src={src ? src : userImg} alt="User Avatar" />
    </div>
  );
}

export default Avatar;
