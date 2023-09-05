// services/blogService.js
import axios from "axios";

export async function fetchBlogPosts() {
  try {
    const response = await axios.get("/api/posts");
    return response.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
}

export async function fetchBlogPostById(id) {
  try {
    const response = await axios.get("/api/posts/" + id);

    console.log({ response });
    return response.data;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
}

export async function createBlogPost(newPostData) {
  try {
    const response = await axios.post("/api/posts", newPostData);
    return response.data;
  } catch (error) {
    console.error("Error creating blog post:", error);
    throw error;
  }
}

// Other API-related functions can also be defined here
