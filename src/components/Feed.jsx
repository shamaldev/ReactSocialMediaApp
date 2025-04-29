import React, { useState } from "react";
import Post from "./Post";
import "./Feed.css";
const initialPosts = [
  {
    id: 1,
    user: { name: "Alice", avatar: "https://picsum.photos/id/1/100" },
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    content: "Enjoying a sunny afternoon!",
    likes: 0,
    likedBy: [],
  },
  {
    id: 2,
    user: { name: "Bob", avatar: "https://picsum.photos/id/1/100" },
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    content: "Just finished reading a great book.",
    likes: 0,
    likedBy: [],
  },
  {
    id: 3,
    user: { name: "Charlie", avatar: "https://picsum.photos/id/1/100" },
    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    content: "Coding is fun!",
    likes: 0,
    likedBy: [],
  },
];

export default function Feed() {
  const [posts, setPosts] = useState(initialPosts);
  const [newContent, setNewContent] = useState("");
  const currentUser = {
    id: 7,
    name: "User",
    avatar: "https://picsum.photos/id/49/100",
  };
  function handleInputChange(event) {
    setNewContent(event.target.value);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    if (newContent.trim()) {
      const newPost = {
        id: Date.now(),
        user: currentUser,
        timestamp: new Date(),
        content: newContent,
        likes: 0,
        likedBy: [],
      };
      setPosts([...posts, newPost]);
    }
  }

  function handleLike(postId) {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id === postId) {
          if (post.likedBy.includes(currentUser.id)) {
            return {
              ...post,
              likes: post.likes - 1,
              likedBy: post.likedBy.filter((id) => id !== currentUser.id),
            };
          } else {
            return {
              ...post,
              likes: post.likes + 1,
              likedBy: [...post.likedBy, currentUser.id],
            };
          }
        }
        return post;
      })
    );
  }

  return (
    <div className="feed">
      <form onSubmit={handleSubmitForm} className="new-post-form">
        <textarea
          placeholder="whats on your mind?"
          value={newContent}
          onChange={handleInputChange}
        ></textarea>
        <button type="submit">Post</button>
      </form>

      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={handleLike}
          isLiked={post.likedBy.includes(currentUser.id)}
        />
      ))}
    </div>
  );
}
