import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/adminpanel/pagination";
import BlogListItems from "../components/blog/blogListItems";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://prano.group/api/posts?page=${page}&limit=10`
      );

      setBlogs(response.data.data);
      setTotalPages(
        Math.ceil(response.data.itemsCount / response.data.perPage)
      );
    } catch (err) {
      setError("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="pt-32  w-full px-4 bg-white">
      <h2 className="text-3xl w-full mx-auto  sm:text-4xl font-bold font-roboto text-center  text-Ndark relative inline-block after:content-[''] after:block after:w-20 after:h-1 after:mt-3 after:mx-auto after:bg-Nblue mb-7">
        Актуальні новини і акції: 
      </h2>
      <BlogListItems blogs={blogs} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <div className="h-12 "></div>
    </div>
  );
};

export default BlogList;
