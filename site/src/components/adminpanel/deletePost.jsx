import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const DeletePost = ({ postId, onDeleteSuccess }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!accessToken || isDeleting) return; // Prevent duplicate calls

    if (!window.confirm("Ви впевнені, що хочете видалити цей пост?")) return; // Single alert confirmation

    setIsDeleting(true);

    try {
      console.log("Deleting post:", postId);

      await axios.delete(`https://prano.group/api/posts/${postId}`, {
        headers: { Authorization: accessToken },
      });

      console.log("Post deleted:", postId);
      onDeleteSuccess(postId);
    } catch (error) {
      console.error(
        "Failed to delete post:",
        error.response?.data || error.message
      );
      alert("Помилка при видаленні поста");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={`bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition ${
        isDeleting ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isDeleting ? "⏳ Видаляється..." : "🗑️"}
    </button>
  );
};

export default DeletePost;
