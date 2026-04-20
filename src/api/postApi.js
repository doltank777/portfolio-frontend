import axios from "./axios";

// 게시글 조회
export const getPosts = () =>
  axios.get("/posts");

// 게시글 작성
export const createPost = (data) =>
  axios.post("/posts", data);