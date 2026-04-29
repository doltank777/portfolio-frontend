import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

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
        <h1 className="text-2xl font-bold text-gray-900">로그인</h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          계정에 로그인하고 게시글 작성, 좋아요, 댓글 기능을 이용해보세요.
        </p>
      </div>

      <Card>
        <form onSubmit={submit}>
          <div className="mb-5">
            <Input
              label="아이디"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
            />
          </div>

          <div className="mb-7">
            <Input
              label="비밀번호"
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "로그인 중..." : "로그인"}
          </Button>

          <div className="mt-5 text-center text-sm text-gray-500">
            아직 회원이 아니신가요?
            <Link
              to="/register"
              className="ml-2 font-bold text-blue-600 hover:underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}