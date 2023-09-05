// /api/posts.js
let postsData = [
  {
    id: 1,
    title: "Sample Blog Post 1",
    content: "This is the content of the first blog post.",
    author: "John Doe",
  },
  {
    id: 2,
    title: "Sample Blog Post 2",
    content: "This is the content of the second blog post.",
    author: "Jane Smith",
  },
  // Add more blog posts here
];

export default function handler(req, res) {
  const { id } = req.query;
  const postId = parseInt(id);

  if (req.method === "GET" && postId) {
    console.log({ postId });
    // Find the blog post by ID
    const post = postsData.find((post) => post.id === postId);

    console.log({ post });

    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    return res.status(200).json(post);
  } else if (req.method === "GET") {
    // Find the blog post by ID
    const post = postsData.find((post) => post.id === postId);

    if (post) {
      return res.status(200).json(post);
    }

    // Return all blog posts as JSON
    return res.status(200).json(postsData);
  } else if (req.method === "POST") {
    // Create a new blog post
    const { title, content, author } = req.body;
    const newPost = {
      id: Date.now(), // Use a unique identifier (e.g., timestamp) as the ID
      title,
      content,
      author,
    };
    postsData.push(newPost);
    return res.status(201).json(newPost); // Return the newly created post
  } else if (req.method === "PUT") {
    // Update an existing blog post
    const { id, title, content, author } = req.body;
    const existingPostIndex = postsData.findIndex((post) => post.id === id);
    if (existingPostIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }
    const updatedPost = { id, title, content, author };
    postsData[existingPostIndex] = updatedPost;
    return res.status(200).json(updatedPost); // Return the updated post
  } else if (req.method === "DELETE") {
    // Delete a blog post by ID
    const { id } = req.body;
    const existingPostIndex = postsData.findIndex((post) => post.id === id);
    if (existingPostIndex === -1) {
      return res.status(404).json({ message: "Post not found" });
    }
    const deletedPost = postsData.splice(existingPostIndex, 1)[0];
    return res.status(200).json(deletedPost); // Return the deleted post
  } else {
    // Handle other HTTP methods if needed
    return res.status(405).end();
  }
}
