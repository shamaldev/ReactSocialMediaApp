import React, { useEffect, useState } from "react";
import Post from "./Post";
import "./Feed.css";
import axios from "axios";
// const initialPosts = [
//   {
//     id: 1,
//     user: { name: "Alice", avatar: "https://picsum.photos/id/1/100" },
//     timestamp: new Date(Date.now() - 3600000), // 1 hour ago
//     content: "Enjoying a sunny afternoon!",
//     likes: 0,
//     likedBy: [],
//     comments: [
//       {
//         id: "c1",
//         user: { name: "Bob" },
//         content: "Nice!",
//         timestamp: Date.now() - 60000,
//       },
//     ],
//   },
//   {
//     id: 2,
//     user: { name: "Bob", avatar: "https://picsum.photos/id/1/100" },
//     timestamp: new Date(Date.now() - 7200000), // 2 hours ago
//     content: "Just finished reading a great book.",
//     likes: 0,
//     likedBy: [],
//     comments: [],
//   },
//   {
//     id: 3,
//     user: { name: "Charlie", avatar: "https://picsum.photos/id/1/100" },
//     timestamp: new Date(Date.now() - 10800000), // 3 hours ago
//     content: "Coding is fun!",
//     likes: 0,
//     likedBy: [],
//     comments: [],
//   },
// ];

export default function Feed({ currentUser }) {
  const [posts, setPosts] = useState([]);
  const [newContent, setNewContent] = useState("");
//   let nextCommentId = useRef(100);
  const authToken = localStorage.getItem("authToken");
  useEffect(() => {
    const fetchPosts = async () => {
      if (authToken) {
        try {
          const response = await axios.get("http://localhost:5000/api/posts", {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setPosts(response.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      }
    };
    fetchPosts();
  }, [authToken]);

  function handleInputChange(event) {
    setNewContent(event.target.value);
  }

  async function handleSubmitForm(event) {
    event.preventDefault();
    if (newContent.trim() && currentUser) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/posts",
          { content: newContent },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setPosts([...posts, response.data]);
        setNewContent("");
      } catch (error) {
        console.error("Error creating post:", error);
      }
    }
  }

 async function handleLike(postId) {
    if (authToken) {
        try {
            const response = await axios.put(`http://localhost:5000/api/posts/${postId}/like`,{}, {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              })
              setPosts(prevPosts=>
                prevPosts.map(post=>post._id === postId ? response.data:post)
              )
        } catch (error) {
            console.error('Error liking post:', error);
        }
    }
  }

//  async function handleAddComment(postId, commentText) {
//     setPosts((prevPosts) =>
//       prevPosts.map((post) =>
//         post.id === postId
//           ? {
//               ...post,
//               comments: [
//                 ...(post.comments || []),
//                 {
//                   id: `c${nextCommentId.current++}`,
//                   user: currentUser,
//                   content: commentText,
//                   timestamp: Date.now(),
//                 },
//               ],
//             }
//           : post
//       )
//     );
//   }

async function handleAddComment(postId,commentText) {
    if (authToken && currentUser) {
        try {
          const response = await axios.post(
            `http://localhost:5000/api/posts/${postId}/comments`,
            { content: commentText },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          );
          setPosts(prevPosts =>
            prevPosts.map(post => (post._id === postId ? response.data : post))
          );
        } catch (error) {
          console.error('Error adding comment:', error);
        }
      }
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
          key={post._id}
          post={post}
          onLike={handleLike}
          isLiked={post.likes.includes(localStorage.getItem('userId'))} 
          onAddComment={handleAddComment}
        />
      ))}
    </div>
  );
}
