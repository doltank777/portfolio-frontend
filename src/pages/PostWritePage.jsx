import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postApi";
import styles from "../styles/postFormStyles";

export default function PostWritePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("제목을 입력하세요.");
      return;
    }

    if (!form.content.trim()) {
      alert("내용을 입력하세요.");
      return;
    }

    try {
      setLoading(true);
      const res = await createPost(form);
      alert("게시글이 등록되었습니다.");

      if (res?.data?.id) {
        navigate(`/posts/${res.data.id}`);
        return;
      }

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("게시글 등록 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.title}>게시글 작성</h1>
          <p style={styles.subtitle}>
            새로운 게시글을 작성하고 포트폴리오 게시판에 공유해보세요.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.card}>
        <div style={styles.field}>
          <label htmlFor="title" style={styles.label}>
            제목
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="게시글 제목을 입력하세요"
            style={styles.input}
            maxLength={100}
          />
          <div style={styles.helperRow}>
            <span style={styles.helperText}>
              명확한 제목을 작성하면 게시글이 더 잘 보입니다.
            </span>
            <span style={styles.countText}>{form.title.length}/100</span>
          </div>
        </div>

        <div style={styles.field}>
          <label htmlFor="content" style={styles.label}>
            내용
          </label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="게시글 내용을 입력하세요"
            style={styles.textarea}
            maxLength={5000}
          />
          <div style={styles.helperRow}>
            <span style={styles.helperText}>
              프로젝트 내용, 구현 내용, 트러블슈팅 등을 자유롭게 작성해보세요.
            </span>
            <span style={styles.countText}>{form.content.length}/5000</span>
          </div>
        </div>

        <div style={styles.buttonRow}>
          <button
            type="button"
            onClick={() => navigate("/")}
            style={styles.listButton}
            disabled={loading}
          >
            목록
          </button>

          <button
            type="submit"
            style={loading ? styles.submitButtonDisabled : styles.submitButton}
            disabled={loading}
          >
            {loading ? "등록 중..." : "게시글 등록"}
          </button>
        </div>
      </form>
    </div>
  );
}