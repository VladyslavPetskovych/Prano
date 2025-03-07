import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./createPost";
import PostItem from "./postItem";
import Pagination from "../pagination";

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://prano.group/api/posts?page=${page}&limit=10`
      );
      console.log("API Response:", response.data);

      setPosts(response.data.data);
      setTotalPages(
        Math.ceil(response.data.itemsCount / response.data.perPage)
      );
    } catch (err) {
      setError("Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleDeleteSuccess = (deletedPostId) => {
    setPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId)
    );
  };

  const handleEditSuccess = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id ? updatedPost : post
      )
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold bg-slate-200 p-5">Manage Posts</h2>
      <CreatePost refreshPosts={() => fetchPosts(currentPage)} />{" "}
      <ul className="flex flex-wrap gap-4 justify-center">
        {posts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            onEditSuccess={handleEditSuccess}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PostManagement;
