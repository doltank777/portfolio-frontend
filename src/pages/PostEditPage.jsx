import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    loadPost();
  }, []);

  const loadPost = async () => {
    const res = await api.get(`/posts/${id}`);
    setForm({
      title: res.data.title,
      content: res.data.content,
    });
  };

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    await api.put(`/posts/${id}`, form);

    alert("수정 완료");
    navigate(`/posts/${id}`);
  };

  return (
    <div style={{ width: "700px", margin: "50px auto" }}>
      <h2>게시글 수정</h2>

      <form onSubmit={submit}>
        <input
          name="title"
          value={form.title}
          onChange={change}
          placeholder="제목"
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <textarea
          name="content"
          value={form.content}
          onChange={change}
          placeholder="내용"
          rows="10"
          style={{ width: "100%", padding: "10px" }}
        />

        <br /><br />

        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}