import React from "react";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("uk-UA", options);
};

const BlogListItems = ({ blogs }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12 px-4">
      {blogs.map((blog) => (
        <li
          key={blog._id}
          className="p-6 border rounded-2xl shadow-xl flex flex-col items-center text-center bg-white hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            src={`https://prano.group/api/postImages/${blog.images?.[0]}`}
            alt={blog.title}
            className="w-full h-60 object-cover rounded-2xl mb-4"
          />
          <h3 className="text-2xl font-extrabold text-gray-900 mb-2">
            {blog.title}
          </h3>
          <p className="text-gray-700 mb-4 line-clamp-3 text-base">
            {blog.description}
          </p>
          <div className="flex flex-row justify-between items-center w-full ">
            <p className="text-gray-500 text-sm ">
              {formatDate(blog.createdAt)}
            </p>
            <a
              href={`/blog/${blog._id}`}
              className="bg-blue-500 text-white px-3 py-2 rounded-full transition hover:bg-blue-600"
            >
              Детальніше
            </a>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BlogListItems;
