import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import styles from "../styles/authFormStyles";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      alert("아이디를 입력하세요.");
      return;
    }

    if (!form.password.trim()) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    try {
      setLoading(true);

      const res = await login(form);

      localStorage.setItem("accessToken", res.data);

      alert("로그인 성공");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <h1 style={styles.title}>로그인</h1>
        <p style={styles.subtitle}>
          계정에 로그인하고 게시글 작성, 좋아요, 댓글 기능을 이용해보세요.
        </p>
      </div>

      <form onSubmit={submit} style={styles.card}>
        <div style={styles.field}>
          <label htmlFor="username" style={styles.label}>
            아이디
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            style={styles.input}
          />
          <span style={styles.helperText}>
            로그인에 사용할 아이디를 입력해주세요.
          </span>
        </div>

        <div style={styles.field}>
          <label htmlFor="password" style={styles.label}>
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            style={styles.input}
          />
          <span style={styles.helperText}>
            비밀번호는 대소문자를 구분할 수 있으니 정확히 입력해주세요.
          </span>
        </div>

        <div style={styles.buttonRow}>
          <button
            type="submit"
            style={loading ? styles.submitButtonDisabled : styles.submitButton}
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </div>

        <div style={styles.subActionRow}>
          <span style={styles.subActionText}>아직 회원이 아니신가요?</span>
          <Link to="/register" style={styles.subActionLink}>
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}