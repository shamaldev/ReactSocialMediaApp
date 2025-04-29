import React from "react";
import moment from "moment";
import UserProfile from "./UserProfile";
import './Post.css'
export default function Post({ user, timeStamp, content }) {
  return (
    <div className="post">
      <UserProfile name={user.name} avatar={user.avatar} />
      <div className="post-content">
        <p className="timestamp">{moment(timeStamp).fromNow()}</p>
        <p className="content">{content}</p>
      </div>
    </div>
  );
}
