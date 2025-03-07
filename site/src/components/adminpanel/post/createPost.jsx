import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import useSelector
import axios from "axios";

const CreatePost = ({ refreshPosts }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { accessToken } = useSelector((state) => state.auth);

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (images) {
      Array.from(images).forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      if (!accessToken) {
        throw new Error("Access token is missing");
      }

      await axios.post("https://prano.group/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${accessToken}`,
        },
      });
      alert("Post created successfully");

      refreshPosts();
    } catch (err) {
      setError("Failed to create post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-200 min-h-[50vh] flex items-center justify-center px-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[100%] md:w-[50%]">
        <h2 className="text-2xl font-bold mb-4 text-center">Створити пост</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Заголовок"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <textarea
            placeholder="Опис"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border p-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 w-full text-white p-2"
            disabled={loading}
          >
            {loading ? "Creating..." : "Додати пост"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
