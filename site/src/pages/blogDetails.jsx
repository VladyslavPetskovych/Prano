import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Seo, JsonLd, SITE_URL, SITE_NAME } from "../components/utils/seo.jsx";
import ReactMarkdown from "react-markdown"; // Імпорт бібліотеки для рендерингу Markdown

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("uk-UA", options);
};

// Прибирає Markdown-розмітку, щоб отримати чистий текст для meta description
const toPlainText = (markdown = "") =>
  markdown
    .replace(/^\s*#\s[^\n]*\n/, "") // перший заголовок дублює назву статті
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

// Прибирає перший заголовок тексту, якщо він повторює назву статті (вона вже в <h1>)
const withoutTitleHeading = (markdown = "", title = "") => {
  const match = /^\s*#\s+([^\n]*)\n/.exec(markdown);
  return match && match[1].trim() === title.trim()
    ? markdown.slice(match[0].length)
    : markdown;
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
  if (error)
    return (
      <>
        <Seo title={`Статтю не знайдено | ${SITE_NAME}`} path={`/blog/${id}`} noindex />
        <p className="text-center text-red-500 mt-10">{error}</p>
      </>
    );

  const description = toPlainText(blog.description).slice(0, 160);
  const image = blog.images?.[0]
    ? `${SITE_URL}/api/postImages/${blog.images[0]}`
    : undefined;

  return (
    <div className="bg-Ngold w-full py-32 px-4">
      <Seo
        title={`${blog.title} | ${SITE_NAME}`}
        description={description}
        path={`/blog/${blog._id}`}
        image={image}
        type="article"
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blog.title,
          description,
          image,
          datePublished: blog.createdAt,
          dateModified: blog.updatedAt || blog.createdAt,
          mainEntityOfPage: `${SITE_URL}/blog/${blog._id}`,
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/og/prano-logo.png` },
          },
        }}
      />

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
          <ReactMarkdown
            // На сторінці вже є <h1> з назвою, тому заголовки з тексту статті — <h2>
            components={{ h1: ({ node, ...props }) => <h2 {...props} /> }}
          >
            {withoutTitleHeading(blog.description, blog.title)}
          </ReactMarkdown>
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
