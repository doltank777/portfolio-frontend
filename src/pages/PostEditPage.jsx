import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostDetail, updatePost } from "../api/postApi";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Textarea from "../components/ui/Textarea";

export default function PostEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      setPageLoading(true);

      const res = await getPostDetail(id);

      setForm({
        title: res.data.title || "",
        content: res.data.content || "",
      });
    } catch (error) {
      console.log(error);
      alert("게시글 정보를 불러오지 못했습니다.");
      navigate("/");
    } finally {
      setPageLoading(false);
    }
  };

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

      await updatePost(id, form);
      alert("게시글이 수정되었습니다.");
      navigate(`/posts/${id}`);
    } catch (error) {
      console.log(error);
      alert("게시글 수정 실패");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="mx-auto mt-10 max-w-4xl px-4 pb-10">
        <Card>
          <p className="text-base text-gray-600">
            게시글 정보를 불러오는 중입니다...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl px-4 pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">게시글 수정</h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          기존 게시글 내용을 수정하고 업데이트할 수 있습니다.
        </p>
      </div>

      <Card>
        <form onSubmit={submit}>
          <div className="mb-6">
            <Input
              label="제목"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="게시글 제목을 입력하세요"
              maxLength={100}
            />

            <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm">
              <span className="text-gray-500">
                제목은 게시글의 핵심 내용을 잘 드러내도록 작성해보세요.
              </span>
              <span className="font-semibold text-gray-400">
                {form.title.length}/100
              </span>
            </div>
          </div>

          <div className="mb-7">
            <Textarea
              label="내용"
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="게시글 내용을 입력하세요"
              maxLength={5000}
              rows={14}
            />

            <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm">
              <span className="text-gray-500">
                구현 과정, 개선 내용, 트러블슈팅 등을 정리해보세요.
              </span>
              <span className="font-semibold text-gray-400">
                {form.content.length}/5000
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              목록
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(`/posts/${id}`)}
              disabled={loading}
            >
              취소
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "수정 중..." : "게시글 수정"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}