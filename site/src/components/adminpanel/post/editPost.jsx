import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const EditPost = ({ post, onClose, onEditSuccess }) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [loading, setLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);

  const handleSave = async () => {
    if (!accessToken) {
      alert("Access denied: Missing authentication token.");
      return;
    }

    setLoading(true);
    try {
      const updatedData = {};
      if (title !== post.title) updatedData.title = title;
      if (description !== post.description) updatedData.description = description;

      const response = await axios.patch(
        `https://prano.group/api/posts/${post._id}`,
        updatedData,
        {
          headers: { Authorization: `${accessToken}` },
        }
      );

      console.log("Post updated:", response.data);

      if (onEditSuccess && typeof onEditSuccess === "function") {
        onEditSuccess({ ...post, ...updatedData });
      } else {
        console.warn("onEditSuccess is not provided or is not a function");
      }

      onClose();
    } catch (error) {
      console.error("Failed to update post:", error.response?.data || error.message);
      alert("Помилка при оновленні поста");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
        <h2 className="text-xl font-bold mb-4">Редагувати пост</h2>
        <input
          type="text"
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button className="bg-gray-400 text-white px-3 py-1 rounded" onClick={onClose}>
            Скасувати
          </button>
          <button
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Збереження..." : "Зберегти"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
