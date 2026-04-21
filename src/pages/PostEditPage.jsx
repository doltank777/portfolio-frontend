import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetail, updatePost } from "../api/postApi";
import styles from "../styles/postFormStyles";
import commonStyles from "../styles/commonStyles";

export default function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      setPageLoading(true);
      const res = await getPostDetail(id);

      setForm({
        title: res.data.title || "",
        content: res.data.content || "",
      });
    } catch (error) {
      console.log(error);
      alert("게시글 정보를 불러오지 못했습니다.");
      navigate("/");
    } finally {
      setPageLoading(false);
    }
  };

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
      await updatePost(id, form);
      alert("게시글이 수정되었습니다.");
      navigate(`/posts/${id}`);
    } catch (error) {
      console.log(error);
      alert("게시글 수정 실패");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div style={styles.container}>
        <div style={commonStyles.loadingBox}>게시글 정보를 불러오는 중입니다...</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <div>
          <h1 style={styles.title}>게시글 수정</h1>
          <p style={styles.subtitle}>
            기존 게시글 내용을 수정하고 업데이트할 수 있습니다.
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
              제목은 게시글의 핵심 내용을 잘 드러내도록 작성해보세요.
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
              구현 과정, 개선 내용, 트러블슈팅 등을 정리하면 더 좋은 게시글이 됩니다.
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
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
            style={commonStyles.cancelButton}
            disabled={loading}
          >
            취소
          </button>

          <button
            type="submit"
            style={loading ? styles.submitButtonDisabled : styles.submitButton}
            disabled={loading}
          >
            {loading ? "수정 중..." : "게시글 수정"}
          </button>
        </div>
      </form>
    </div>
  );
}