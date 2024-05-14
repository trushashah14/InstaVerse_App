import axios from "axios";

const api = axios.create({ baseURL: "https://instaverseapp.onrender.com" });


// Axios interceptor to include the token in the Authorization header for each request
api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    const profile = JSON.parse(localStorage.getItem("profile"));
    req.headers.Authorization = `Bearer ${profile.token}`;
  }

  return req;
});

export const getStories = async () => api.get("/stories");
export const createStory = async (story) => api.post("/stories", story);
export const updateStory = async (id, story) =>
  api.patch(`${"/stories"}/${id}`, story);
export const deleteStory = async (id) => api.delete(`${"/stories"}/${id}`);
export const likeStory = async (id) =>
  api.patch(`${"/stories"}/${id}/likeStory`);

export const login = async (formValues) => api.post("/user/login", formValues);
export const signup = async (formValues) =>
  api.post("/user/signup", formValues);
