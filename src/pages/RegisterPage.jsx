import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/authApi";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

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

    if (form.password.length < 4) {
      alert("비밀번호는 4자 이상 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      await register(form);

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
    <div className="mx-auto mt-16 max-w-xl px-4 pb-10">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          새 계정을 생성하고 포트폴리오 게시판 서비스를 시작해보세요.
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
              maxLength={30}
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
              maxLength={100}
            />

            <p className="mt-2 text-sm text-gray-500">
              비밀번호는 4자 이상 입력해주세요.
            </p>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "가입 중..." : "회원가입"}
          </Button>

          <div className="mt-5 text-center text-sm text-gray-500">
            이미 계정이 있으신가요?
            <Link
              to="/login"
              className="ml-2 font-bold text-blue-600 hover:underline"
            >
              로그인
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}