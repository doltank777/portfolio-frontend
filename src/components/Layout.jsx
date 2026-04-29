import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUsernameFromToken } from "../utils/auth";

export default function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const username = getUsernameFromToken();
  const isLogin = !!token;

  const handleLogout = () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) return;

    localStorage.removeItem("accessToken");
    alert("로그아웃 되었습니다.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="text-2xl font-extrabold tracking-tight text-gray-900">
            Portfolio Board
          </Link>

          <nav className="flex flex-wrap items-center gap-2">
            <Link to="/" className="rounded-lg px-3 py-2 font-semibold text-gray-700 hover:bg-gray-100">
              홈
            </Link>

            {isLogin && (
              <Link to="/write" className="rounded-lg px-3 py-2 font-semibold text-gray-700 hover:bg-gray-100">
                글쓰기
              </Link>
            )}

            {!isLogin ? (
              <>
                <Link to="/login" className="rounded-lg bg-gray-900 px-4 py-2 font-bold text-white">
                  로그인
                </Link>
                <Link to="/register" className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white">
                  회원가입
                </Link>
              </>
            ) : (
              <>
                <span className="px-3 py-2 font-bold text-gray-900">
                  {username ? `${username}님` : "로그인됨"}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
                >
                  로그아웃
                </button>
              </>
            )}
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}