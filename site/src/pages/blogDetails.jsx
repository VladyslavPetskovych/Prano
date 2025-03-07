import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://prano.group/api/posts/${id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog post:", error);
        setError("Blog post not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 pt-32 bg-white shadow-lg rounded-lg">
      <img
        src={`https://prano.group/api/postImages/${blog.images?.[0]}`}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-lg mb-4"
      />
      <h1 className="text-3xl font-bold text-gray-800 mb-4 my-12">
        {blog.title}
      </h1>
      <p className="text-gray-600 leading-relaxed">{blog.description}</p>


      <div className="flex justify-center mt-8">
        <Link
          to="/blog"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          ← Читати інші статті
        </Link>
      </div>
    </div>
  );
};

export default BlogDetails;
