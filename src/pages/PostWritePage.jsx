import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postApi";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";
import Card from "../components/ui/Card";

export default function PostWritePage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
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

      const res = await createPost(form);
      alert("게시글이 등록되었습니다.");

      if (res?.data?.id) {
        navigate(`/posts/${res.data.id}`);
        return;
      }

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("게시글 등록 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-4xl px-4 pb-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">게시글 작성</h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          새로운 게시글을 작성하고 포트폴리오 게시판에 공유해보세요.
        </p>
      </div>

      <Card className="p-7">
        <form onSubmit={submit}>
          <div className="mb-6">
            <label htmlFor="title" className="mb-2 block font-bold text-gray-900">
              제목
            </label>

            <Input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="게시글 제목을 입력하세요"
              maxLength={100}
            />

            <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm">
              <span className="text-gray-500">
                명확한 제목을 작성하면 게시글이 더 잘 보입니다.
              </span>
              <span className="font-semibold text-gray-400">
                {form.title.length}/100
              </span>
            </div>
          </div>

          <div className="mb-7">
            <label htmlFor="content" className="mb-2 block font-bold text-gray-900">
              내용
            </label>

            <Textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="게시글 내용을 입력하세요"
              maxLength={5000}
            />

            <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm">
              <span className="text-gray-500">
                프로젝트 내용, 구현 내용, 트러블슈팅 등을 작성해보세요.
              </span>
              <span className="font-semibold text-gray-400">
                {form.content.length}/5000
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              목록
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "등록 중..." : "게시글 등록"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}