// pages/index.js
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBlogPosts } from "@/services/blogService";

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchBlogPosts()
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching blog data: ", error));
  }, []);

  return (
    <div className="container mx-auto p-3">
      <h1 className="text-3xl font-semibold mb-4">Blog List</h1>
      <ul className="space-y-4">
        {posts.map((blog) => (
          <li
            key={blog.id}
            className="border border-gray-200 p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-600">{blog.author}</p>
              <p className="mt-2">{blog.content}</p>
            </div>
            <div className="flex space-x-4">
              <Link legacyBehavior href={`/edit/${blog.id}`}>
                <a className="text-blue-500 hover:underline">Edit</a>
              </Link>
              <button className="text-red-500 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
