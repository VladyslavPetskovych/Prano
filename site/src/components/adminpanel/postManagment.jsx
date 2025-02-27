import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./createPost";

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://prano.group/api/posts?page=1&limit=10"
      );
      console.log("Fetched Posts:", response.data.data);
      setPosts(response.data.data);
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold  bg-slate-200 p-5">Manage Posts</h2>
  
      <CreatePost refreshPosts={fetchPosts} />
      <ul className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <li key={post._id} className="border-zinc-300 border p-4 w-64 mb-4">
            <h3 className="text-xl font-semibold truncate">{post.title}</h3>
            <p className="truncate">{post.description}</p>
            {post.images && post.images.length > 0 && (
              <img
                src={`https://prano.group/api/postImages/${post.images[0]}`}
                alt={post.title}
                className="max-w-full h-32 w-32 mt-2"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostManagement;
