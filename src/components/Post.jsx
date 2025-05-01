import React, { useState } from "react";
import moment from "moment";
import UserProfile from "./UserProfile";
import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Install: npm install @fortawesome/react-fontawesome @fortawesome/free-regular-svg-icons
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import Comment from "./Comment";
export default function Post({ post, onLike, isLiked ,onAddComment}) {
   const [isCommenting,setIsCommenting]  =useState(false)
   const [commentText,setCommentText] = useState('')
   const userId = localStorage.getItem('userId');
   const isLikedByUser = post.likes.some(like => like === userId);
   function handleCommentChange(event) {
    setCommentText(event.target.value)
   }

   function handleCommentClick() {
    setIsCommenting(true)
   }

   function handlePostComment(event) {
    event.preventDefault()
    if(commentText.trim()!==''){
        onAddComment(post._id,commentText)
        setCommentText('')
        setIsCommenting(false)
    }
   }
  return (
    <div className="post">
      <UserProfile name={post.user.name} avatar={post.user.avatar} />
      <div className="post-content">
        <p className="timestamp">{moment(post.timeStamp).fromNow()}</p>
        <p className="content">{post.content}</p>
        <div className="post-actions">
          <button
            className={`like-button ${isLikedByUser ? "liked" : ""}`}
            onClick={() => onLike(post._id)}
          >
            <FontAwesomeIcon icon={isLikedByUser ? faHeartSolid : faHeartRegular} />
            <span className="like-count">{post.likes.length}</span>
          </button>
          <button className="comment-button"><FontAwesomeIcon icon={faComment} onClick={handleCommentClick}/></button>
          <span className="comment-count">{post.comments ? post.comments.length : 0}</span>
          {isCommenting && (
            <form onSubmit={handlePostComment}>
                <input type="text" placeholder="Write a comment..." value={commentText} onChange={handleCommentChange}/>
                <button type="submit">Post</button>
            </form>
          )}

          {post.comments && post.comments.map(comment=>(
            <Comment key={comment._id} {...comment}/>
          ))}
        </div>
      </div>
    </div>
  );
}
