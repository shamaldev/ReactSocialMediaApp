import React from 'react'
import './Comment.css';
export default function Comment({user,content,timestamp}) {
  return (
    <div className='comment'>
      <span className="comment-user">{user.name}</span>
      <span className="comment-content">{content}</span>
      <span className="comment-content">{new Date(timestamp).toLocaleTimeString()}</span>
    </div>
  )
} 
