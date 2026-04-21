import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUsernameFromToken } from "../utils/auth";

export default function Layout() {
  const navigate = useNavigate();
  const username = getUsernameFromToken();
  const isLogin = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    const ok = window.confirm("로그아웃 하시겠습니까?");
    if (!ok) return;

    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <Link to="/" style={styles.logo}>
            Portfolio Board
          </Link>

          <nav style={styles.nav}>
            <Link to="/" style={styles.navLink}>
              홈
            </Link>

            {isLogin && (
              <Link to="/write" style={styles.navLink}>
                글쓰기
              </Link>
            )}

            {!isLogin ? (
              <>
                <Link to="/login" style={styles.loginButton}>
                  로그인
                </Link>
                <Link to="/register" style={styles.registerButton}>
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <span style={styles.userText}>
                  {username ? `${username}님` : "로그인됨"}
                </span>
                <button onClick={handleLogout} style={styles.logoutButton}>
                  로그아웃
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
  },
  header: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  headerInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#111827",
    textDecoration: "none",
    letterSpacing: "-0.4px",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  navLink: {
    textDecoration: "none",
    color: "#374151",
    fontWeight: "600",
    padding: "10px 12px",
    borderRadius: "8px",
  },
  loginButton: {
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    backgroundColor: "#111827",
    color: "#ffffff",
    fontWeight: "700",
  },
  registerButton: {
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: "700",
  },
  userText: {
    color: "#111827",
    fontWeight: "700",
    padding: "10px 12px",
  },
  logoutButton: {
    border: "none",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    padding: "10px 14px",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
  },
  main: {
    minHeight: "calc(100vh - 73px)",
  },
};