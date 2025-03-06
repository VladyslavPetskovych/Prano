import React from "react";

const BlogListItems = ({ blogs }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12">
      {blogs.map((blog) => (
        <li
          key={blog._id}
          className="p-6 border rounded-lg shadow-lg flex flex-col items-center text-center bg-white"
        >
          <img
            src={`https://prano.group/api/postImages/${blog.images?.[0]}`}
            alt={blog.title}
            className="w-full h-56 object-cover rounded-lg mb-4"
          />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {blog.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{blog.description}</p>
          <a
            href={`/blog/${blog._id}`}
            className="text-blue-500 hover:text-blue-600 px-4 py-2 rounded-lg transition"
          >
            Детальніше...
          </a>
        </li>
      ))}
    </ul>
  );
};

export default BlogListItems;
