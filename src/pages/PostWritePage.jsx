import { useState } from "react";
import { createPost } from "../api/postApi";
import { useNavigate } from "react-router-dom";

export default function PostWritePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: ""
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await createPost(form);
      alert("게시글 작성 완료!");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("게시글 작성 실패");
    }
  };

  return (
    <div style={{ width: "700px", margin: "50px auto" }}>
      <h2>게시글 작성</h2>

      <form onSubmit={submit}>
        <input
          name="title"
          placeholder="제목 입력"
          onChange={change}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px"
          }}
        />

        <textarea
          name="content"
          placeholder="내용 입력"
          onChange={change}
          rows="10"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px"
          }}
        />

        <button
          type="submit"
          style={{
            padding: "12px 20px"
          }}
        >
          저장하기
        </button>
      </form>
    </div>
  );
}