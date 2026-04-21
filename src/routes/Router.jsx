import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import PostListPage from "../pages/PostListPage";
import PostWritePage from "../pages/PostWritePage";
import PostDetailPage from "../pages/PostDetailPage";
import PostEditPage from "../pages/PostEditPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PostListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/write" element={<PostWritePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/edit/:id" element={<PostEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;