import { useState } from "react";
import { register } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    nickname: ""
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
      await register(form);
      alert("회원가입 성공!");
      navigate("/login");
    }catch (error) {
        console.log(error);
        console.log(error.response);
        alert("회원가입 실패");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>회원가입</h2>

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

        <input
          name="nickname"
          placeholder="닉네임"
          onChange={change}
        />
        <br /><br />

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}