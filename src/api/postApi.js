import axios from "./axios";

// 게시글 목록 조회
export const getPosts = (page = 0, size = 10) =>
  axios.get(`/posts?page=${page}&size=${size}`);

// 게시글 단건 조회
// 백엔드에서 이 API 호출 시 조회수 증가 + 최신 게시글 데이터 반환한다고 가정
export const getPostDetail = (id) => axios.get(`/posts/${id}`);

// 게시글 작성
export const createPost = (data) => axios.post("/posts", data);

// 게시글 수정
export const updatePost = (id, data) => axios.put(`/posts/${id}`, data);

// 게시글 삭제
export const deletePost = (id) => axios.delete(`/posts/${id}`);