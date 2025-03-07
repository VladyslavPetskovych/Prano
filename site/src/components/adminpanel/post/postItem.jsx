import React, { useState } from "react";
import EditPost from "./editPost.jsx";
import DeletePost from "./deletePost.jsx";

const EditButton = ({ onEdit }) => (
  <button
    onClick={onEdit}
    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
  >
    змінити
  </button>
);

const PostItem = ({ post, onEditSuccess, onDeleteSuccess }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li className="border border-zinc-300 p-4 w-64 m-2 rounded-lg shadow-md bg-white relative">
      <div className="flex justify-between mb-2">
        <EditButton onEdit={() => setIsEditing(true)} />
        <DeletePost postId={post._id} onDeleteSuccess={onDeleteSuccess} />
      </div>

      <h3 className="text-xl font-semibold truncate">{post.title}</h3>
      <p className="truncate text-gray-600">{post.description}</p>
      {post.images && post.images.length > 0 && (
        <img
          src={`https://prano.group/api/postImages/${post.images[0]}`}
          alt={post.title}
          className="max-w-full h-32 w-32 mt-2 object-cover rounded"
        />
      )}

      {isEditing && (
        <EditPost
          post={post}
          onClose={() => setIsEditing(false)}
          onEditSuccess={(updatedPost) => {
            if (onEditSuccess && typeof onEditSuccess === "function") {
              onEditSuccess(updatedPost); 
            }
            setIsEditing(false); 
          }}
        />
      )}
    </li>
  );
};

export default PostItem;
