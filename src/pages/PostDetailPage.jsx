import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getPostDetail, deletePost } from "../api/postApi";
import { getUsernameFromToken } from "../utils/auth";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Textarea from "../components/ui/Textarea";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    loadPost();
    loadComments();
    loadLikes();
    loadMyLikeStatus();
  }, [id]);

  const loadPost = async () => {
    try {
      const res = await getPostDetail(id);
      setPost(res.data);
    } catch (error) {
      console.log(error);
      alert("게시글을 불러올 수 없습니다.");
      navigate("/");
    }
  };

  const loadComments = async () => {
    try {
      const res = await api.get(`/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadLikes = async () => {
    try {
      const res = await api.get(`/likes/${id}`);
      setLikeCount(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMyLikeStatus = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token || token === "undefined" || token === "null") {
        setLiked(false);
        return;
      }

      const res = await api.get(`/likes/${id}/me`);
      setLiked(res.data);
    } catch (error) {
      console.log(error);
      setLiked(false);
    }
  };

  const toggleLike = async () => {
    if (likeLoading) return;

    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const prevLiked = liked;
    const prevLikeCount = likeCount;

    const nextLiked = !prevLiked;
    const nextLikeCount = prevLiked
      ? Math.max(prevLikeCount - 1, 0)
      : prevLikeCount + 1;

    setLiked(nextLiked);
    setLikeCount(nextLikeCount);
    setLikeLoading(true);

    try {
      await api.post(`/likes/${id}`);
    } catch (error) {
      console.log(error);
      setLiked(prevLiked);
      setLikeCount(prevLikeCount);
      alert("좋아요 처리 실패");
    } finally {
      setLikeLoading(false);
    }
  };

  const writeComment = async () => {
    if (!content.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }

    try {
      await api.post(`/comments/${id}`, { content });
      setContent("");
      loadComments();
    } catch (error) {
      console.log(error);
      alert("댓글 작성 실패");
    }
  };

  const removeComment = async (commentId) => {
    if (!window.confirm("댓글 삭제하시겠습니까?")) return;

    try {
      await api.delete(`/comments/${commentId}`);
      loadComments();
    } catch (error) {
      console.log(error);
      alert("댓글 삭제 실패");
    }
  };

  const remove = async () => {
    if (!window.confirm("게시글 삭제하시겠습니까?")) return;

    try {
      await deletePost(id);
      alert("삭제 완료");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("삭제 실패");
    }
  };

  if (!post) {
    return (
      <div className="mx-auto mt-10 max-w-4xl px-4 text-base text-gray-600">
        로딩중...
      </div>
    );
  }

  const loginUser = getUsernameFromToken();
  const isWriter = loginUser === post.username;

  return (
    <div className="mx-auto mt-10 max-w-4xl px-4 pb-10">
      <Card className="px-7 py-6">
        <h1 className="text-2xl font-bold leading-snug text-gray-900">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
          <span>작성자: {post.username}</span>
          <span>👀 조회수 {post.viewCount || 0}</span>
          <span>❤️ 좋아요 {likeCount}</span>
        </div>

        <hr className="my-5 border-gray-200" />

        <div className="min-h-[200px] whitespace-pre-wrap text-base leading-8 text-gray-800">
          {post.content}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            목록
          </Button>

          <Button
            type="button"
            variant={liked ? "danger" : "outline"}
            onClick={toggleLike}
            disabled={likeLoading}
          >
            {liked ? "💖 좋아요 취소" : "❤️ 좋아요"}
          </Button>

          {isWriter && (
            <>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate(`/posts/edit/${id}`)}
              >
                수정
              </Button>

              <Button type="button" variant="danger" onClick={remove}>
                삭제
              </Button>
            </>
          )}
        </div>
      </Card>

      <Card className="mt-7 px-7 py-6">
        <h2 className="text-xl font-semibold text-gray-900">댓글</h2>

        <div className="mt-5 flex flex-col gap-3">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요."
            rows={4}
          />

          <Button type="button" className="self-end" onClick={writeComment}>
            댓글 작성
          </Button>
        </div>

        <div className="mt-6">
          {comments.length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-300 py-8 text-center text-sm text-gray-500">
              등록된 댓글이 없습니다.
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <strong className="text-sm font-semibold text-gray-900">
                    {comment.username}
                  </strong>

                  {loginUser === comment.username && (
                    <Button
                      type="button"
                      size="sm"
                      variant="danger"
                      onClick={() => removeComment(comment.id)}
                    >
                      삭제
                    </Button>
                  )}
                </div>

                <p className="whitespace-pre-wrap text-sm leading-7 text-gray-700">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}