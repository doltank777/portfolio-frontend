import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postApi";

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

      // 백엔드에서 생성된 게시글 id 반환 시 상세로 이동
      if (res?.data?.id) {
        navigate(`/posts/${res.data.id}`);
        return;
      }

      // id가 없으면 목록으로 이동
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

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "0 16px 40px",
  },
  pageHeader: {
    marginBottom: "24px",
  },
  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    margin: "10px 0 0",
    fontSize: "15px",
    color: "#6b7280",
    lineHeight: 1.6,
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "28px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
  },
  field: {
    marginBottom: "24px",
  },
  label: {
    display: "block",
    marginBottom: "10px",
    fontSize: "15px",
    fontWeight: "700",
    color: "#111827",
  },
  input: {
    width: "100%",
    height: "48px",
    padding: "0 14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    color: "#111827",
    boxSizing: "border-box",
    outline: "none",
  },
  textarea: {
    width: "100%",
    minHeight: "320px",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    color: "#111827",
    lineHeight: 1.7,
    resize: "vertical",
    boxSizing: "border-box",
    outline: "none",
  },
  helperRow: {
    marginTop: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  helperText: {
    fontSize: "13px",
    color: "#6b7280",
  },
  countText: {
    fontSize: "13px",
    color: "#9ca3af",
    fontWeight: "600",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "28px",
  },
  listButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#f3f4f6",
    color: "#111827",
    cursor: "pointer",
    fontWeight: "700",
  },
  submitButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#111827",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "700",
  },
  submitButtonDisabled: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#9ca3af",
    color: "#ffffff",
    cursor: "not-allowed",
    fontWeight: "700",
  },
};