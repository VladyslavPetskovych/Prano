import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown"; // Імпорт бібліотеки для рендерингу Markdown

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("uk-UA", options);
};

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
    <div className="bg-Ngold w-full py-32 px-4">
      {/* SEO dynamic data */}
      <Helmet>
        <title>{blog.title} | Prano Group</title>
        <meta name="description" content={blog.description?.slice(0, 150)} />
        <meta property="og:title" content={blog.title} />
        <meta
          property="og:description"
          content={blog.description?.slice(0, 150)}
        />
        <meta
          property="og:image"
          content={`https://prano.group/api/postImages/${blog.images?.[0]}`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://prano.group/blog/${blog._id}`}
        />
      </Helmet>

      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg border">
        <img
          src={`https://prano.group/api/postImages/${blog.images?.[0]}`}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4 my-12">
          {blog.title}
        </h1>

        {/* Використовуємо ReactMarkdown для рендерингу Markdown контенту */}
        <div className="text-gray-600 leading-relaxed">
          <ReactMarkdown>{blog.description}</ReactMarkdown>
        </div>

        <div className="flex flex-row items-center justify-between ">
          <p className="text-Ndark font-bold text-sm">
            {formatDate(blog.createdAt)}
          </p>
          <div className="flex justify-center mt-8">
            <Link
              to="/blog"
              className="bg-Nblue text-white px-4 py-2 rounded-3xl shadow-md hover:bg-blue-600 transition"
            >
              ← Читати інші статті
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
