import React from "react";
import moment from "moment";
import UserProfile from "./UserProfile";
import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Install: npm install @fortawesome/react-fontawesome @fortawesome/free-regular-svg-icons
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
export default function Post({ post, onLike, isLiked }) {
  return (
    <div className="post">
      <UserProfile name={post.user.name} avatar={post.user.avatar} />
      <div className="post-content">
        <p className="timestamp">{moment(post.timeStamp).fromNow()}</p>
        <p className="content">{post.content}</p>
        <div className="post-actions">
          <button
            className={`like-button ${isLiked ? "liked" : ""}`}
            onClick={() => onLike(post.id)}
          >
            <FontAwesomeIcon icon={isLiked ? faHeartSolid : faHeartRegular} />
            <span className="like-count">{post.likes > 0 && post.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
