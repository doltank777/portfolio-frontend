import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/postApi";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      setPosts(res.data.content || []);
    } catch (error) {
      console.log(error);
      alert("게시글 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "작성일 없음";

    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return "작성일 없음";

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");

    return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
  };

  if (loading) {
    return (
      <div className="mx-auto mt-10 max-w-5xl px-4 text-base text-gray-600">
        게시글 목록을 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-5xl px-4 pb-10">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">게시글 목록</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            포트폴리오 게시판의 전체 게시글을 확인할 수 있습니다.
          </p>
        </div>

        <Link to="/write">
          <Button>글쓰기</Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <Card className="px-8 py-12 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            등록된 게시글이 없습니다.
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            첫 번째 게시글을 작성해서 게시판을 시작해보세요.
          </p>

          <Link to="/write" className="mt-6 inline-flex">
            <Button>첫 글 작성하기</Button>
          </Link>
        </Card>
      ) : (
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`} className="block">
              <Card className="px-7 py-6 transition hover:-translate-y-0.5 hover:shadow-md">
                <h2 className="text-xl font-semibold leading-relaxed text-gray-900">
                  {post.title}
                </h2>

                <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
                  <span>작성자: {post.username}</span>
                  <span>작성일: {formatDate(post.createdAt)}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700">
                    ❤️ 좋아요 {post.likeCount || 0}
                  </span>

                  <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-700">
                    👀 조회수 {post.viewCount || 0}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}