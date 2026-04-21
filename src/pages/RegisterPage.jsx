import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import styles from "../styles/authFormStyles";

export default function RegisterPage() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username.trim()) {
      alert("아이디를 입력하세요.");
      return;
    }

    if (!form.password.trim()) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    if (form.password.length < 4) {
      alert("비밀번호는 4자 이상 입력해주세요.");
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/register", form);
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("회원가입 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.pageHeader}>
        <h1 style={styles.title}>회원가입</h1>
        <p style={styles.subtitle}>
          새 계정을 생성하고 포트폴리오 게시판 서비스를 시작해보세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={styles.card}>
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
            maxLength={30}
          />
          <span style={styles.helperText}>
            영문, 숫자 중심으로 기억하기 쉬운 아이디를 추천합니다.
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
            maxLength={100}
          />
          <span style={styles.helperText}>
            비밀번호는 4자 이상 입력해주세요.
          </span>
        </div>

        <div style={styles.buttonRow}>
          <button
            type="submit"
            style={loading ? styles.submitButtonDisabled : styles.submitButton}
            disabled={loading}
          >
            {loading ? "가입 중..." : "회원가입"}
          </button>
        </div>

        <div style={styles.subActionRow}>
          <span style={styles.subActionText}>이미 계정이 있으신가요?</span>
          <Link to="/login" style={styles.subActionLink}>
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
}