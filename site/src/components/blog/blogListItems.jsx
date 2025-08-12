import React from "react";
import ReactMarkdown from "react-markdown"; // Імпорт бібліотеки для парсингу Markdown

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("uk-UA", options);
};

const BlogListItems = ({ blogs }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-16 px-6">
      {blogs.map((blog) => (
        <li
          key={blog._id}
          className="p-6 border border-gray-200 rounded-3xl shadow-lg flex flex-col items-center text-center bg-white hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            src={`https://prano.group/api/postImages/${blog.images?.[0]}`}
            alt={blog.title}
            className="w-full h-64 object-cover rounded-2xl mb-5"
          />
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {blog.title}
          </h3>

          {/* Парсинг Markdown опису поста */}
          <p className="text-gray-600 mb-6 line-clamp-3 text-base">
            <ReactMarkdown>{blog.description}</ReactMarkdown>
          </p>

          <div className="flex items-center justify-between w-full mt-auto">
            <p className="text-gray-500 text-sm">
              {formatDate(blog.createdAt)}
            </p>
            <a
              href={`/blog/${blog._id}`}
              className="bg-Nblue hover:bg-blue-700 text-white font-medium text-sm px-4 py-2 rounded-full transition-all duration-300"
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
