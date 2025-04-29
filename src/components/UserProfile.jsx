import React from "react";
import './UserProfile.css'
export default function UserProfile({ name, avatar }) {
  return (
    <div className="user-profile">
      <img src={avatar} alt={name} className="avatar" />
      <span className="name">{name}</span>
    </div>
  );
}
