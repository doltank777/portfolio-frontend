import { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const change = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form);     

      localStorage.setItem("accessToken", res.data);

      alert("로그인 성공");
      navigate("/");
    } catch (error) {
      alert("로그인 실패");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>로그인</h2>

      <form onSubmit={submit}>
        <input
          name="username"
          placeholder="아이디"
          onChange={change}
        />
        <br /><br />

        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={change}
        />
        <br /><br />

        <button type="submit">로그인</button>
      </form>
    </div>
  );
}