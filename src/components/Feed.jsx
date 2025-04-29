import React from "react";
import Post from "./Post";
import './Feed.css'
const initialPosts = [
  {
    id: 1,
    user: { name: "Alice", avatar: "https://picsum.photos/id/1/100" },
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    content: "Enjoying a sunny afternoon!",
  },
  {
    id: 2,
    user: { name: "Bob", avatar: "https://picsum.photos/id/1/100" },
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    content: "Just finished reading a great book.",
  },
  {
    id: 3,
    user: { name: "Charlie", avatar: "https://picsum.photos/id/1/100" },
    timestamp: new Date(Date.now() - 10800000), // 3 hours ago
    content: "Coding is fun!",
  },
];

export default function Feed() {
  return (
    <div className="feed">
      {initialPosts.map((post) => (
        <Post
          key={post.id}
          user={post.user}
          timeStamp={post.timestamp}
          content={post.content}
        />
      ))}
    </div>
  );
}
