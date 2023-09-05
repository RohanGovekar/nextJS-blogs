// pages/edit/[id].js
import { useEffect, useState } from "react";
import { fetchBlogPostById } from "@/services/blogService";
import Layout from "@/components/Layout"; // You can create this layout component

function EditBlog({ blogPost }) {
  // State to hold the retrieved blog post data
  const [post, setPost] = useState(blogPost);

  useEffect(() => {
    // Fetch the blog post details by ID when the component mounts
    fetchBlogPostById(post.id)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching blog post:", error));
  }, [post.id]);

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-semibold mb-4">Edit Blog Post</h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="border rounded-lg py-2 px-3 w-full"
              // Add onChange handler to update the title value
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows="5"
              className="border rounded-lg py-2 px-3 w-full"
              // Add onChange handler to update the content value
            ></textarea>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

// This function runs at build time to provide initial props
export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;

  // Replace this with your logic to fetch the initial blog post data by ID
  //   const blogPost = {
  //     id,
  //     title: "Sample Blog Post",
  //     content: "This is the content of the blog post.",
  //     author: "John Doe",
  //   };

  // Fetch the blog post details by ID when the component mounts
  const blogPost = await fetchBlogPostById(id)
    .then((response) => response)
    .catch((error) => console.error("Error fetching blog post:", error));

  if (!blogPost) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blogPost,
    },
  };
}

export default EditBlog;
