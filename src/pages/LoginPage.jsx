import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authApi";

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
    <div className="mx-auto mt-16 max-w-xl px-4 pb-10">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-900">로그인</h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          계정에 로그인하고 게시글 작성, 좋아요, 댓글 기능을 이용해보세요.
        </p>
      </div>

      <form onSubmit={submit} className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
        <div className="mb-5">
          <label htmlFor="username" className="mb-2 block font-bold text-gray-900">
            아이디
          </label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            className="h-12 w-full rounded-lg border border-gray-300 px-4 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        <div className="mb-7">
          <label htmlFor="password" className="mb-2 block font-bold text-gray-900">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            className="h-12 w-full rounded-lg border border-gray-300 px-4 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-lg px-4 py-3 font-bold text-white ${
            loading ? "cursor-not-allowed bg-gray-400" : "bg-gray-900 hover:bg-black"
          }`}
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>

        <div className="mt-5 text-center text-sm text-gray-500">
          아직 회원이 아니신가요?
          <Link to="/register" className="ml-2 font-bold text-blue-600 hover:underline">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
}