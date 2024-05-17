import axios from "axios";

// Create a new Axios instance with base URL pointing to the API server
const api = axios.create({ baseURL: "https://instaverse-app.onrender.com" });

// Axios interceptor to include the token in the Authorization header for each request
api.interceptors.request.use((req) => {
  // Check if user profile exists in local storage
  if (localStorage.getItem("profile")) {
    // Parse user profile from local storage
    const profile = JSON.parse(localStorage.getItem("profile"));
    // Set Authorization header with bearer token from user profile
    req.headers.Authorization = `Bearer ${profile.token}`;
  }
  return req;
});

// Export API functions to interact with the server

// Function to fetch all stories from the API
export const getStories = async () => api.get("/stories");

// Function to create a new story
export const createStory = async (story) => api.post("/stories", story);

// Function to update an existing story by ID
export const updateStory = async (id, story) => api.patch(`/stories/${id}`, story);

// Function to delete a story by ID
export const deleteStory = async (id) => api.delete(`/stories/${id}`);

// Function to like a story by ID
export const likeStory = async (id) => api.patch(`/stories/${id}/likeStory`);

// Function to login user with provided credentials
export const login = async (formValues) => api.post("/user/login", formValues);

// Function to register a new user with provided details
export const signup = async (formValues) => api.post("/user/signup", formValues);
