import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getPostDetail, deletePost } from "../api/postApi";
import { getUsernameFromToken } from "../utils/auth";

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
      if (!token) {
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
    const nextLikeCount = prevLiked ? prevLikeCount - 1 : prevLikeCount + 1;

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
      <div className="mx-auto mt-10 max-w-4xl px-4 text-lg text-gray-700">
        로딩중...
      </div>
    );
  }

  const loginUser = getUsernameFromToken();
  const isWriter = loginUser === post.username;

  return (
    <div className="mx-auto mt-10 max-w-4xl px-4 pb-10">
      <article className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
        <h1 className="text-3xl font-bold leading-snug text-gray-900">
          {post.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <span>작성자: {post.username}</span>
          <span>👀 조회수 {post.viewCount || 0}</span>
          <span>❤️ 좋아요 {likeCount}</span>
        </div>

        <hr className="my-5 border-gray-200" />

        <div className="min-h-[200px] whitespace-pre-wrap text-base leading-8 text-gray-800">
          {post.content}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-gray-100 px-4 py-2.5 font-bold text-gray-900 hover:bg-gray-200"
          >
            목록
          </button>

          <button
            onClick={toggleLike}
            disabled={likeLoading}
            className={`rounded-lg px-4 py-2.5 font-bold ${
              liked
                ? "bg-rose-200 text-rose-800 hover:bg-rose-300"
                : "bg-red-50 text-red-700 hover:bg-red-100"
            } ${likeLoading ? "cursor-not-allowed opacity-70" : ""}`}
          >
            {liked ? "💖 좋아요 취소" : "❤️ 좋아요"}
          </button>

          {isWriter && (
            <>
              <button
                onClick={() => navigate(`/posts/edit/${id}`)}
                className="rounded-lg bg-blue-50 px-4 py-2.5 font-bold text-blue-700 hover:bg-blue-100"
              >
                수정
              </button>
              <button
                onClick={remove}
                className="rounded-lg bg-red-50 px-4 py-2.5 font-bold text-red-700 hover:bg-red-100"
              >
                삭제
              </button>
            </>
          )}
        </div>
      </article>

      <section className="mt-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-gray-900">댓글</h3>

        <div className="mt-5 flex flex-col gap-3">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요."
            className="min-h-[100px] w-full resize-y rounded-lg border border-gray-300 p-4 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />
          <button
            onClick={writeComment}
            className="self-end rounded-lg bg-gray-900 px-4 py-2.5 font-bold text-white hover:bg-black"
          >
            댓글 작성
          </button>
        </div>

        <div className="mt-6">
          {comments.length === 0 ? (
            <p className="text-sm text-gray-500">등록된 댓글이 없습니다.</p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="mb-3 rounded-xl border border-gray-200 bg-gray-50 p-4"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <strong className="text-gray-900">{comment.username}</strong>

                  {loginUser === comment.username && (
                    <button
                      onClick={() => removeComment(comment.id)}
                      className="rounded-md bg-red-50 px-3 py-1.5 text-sm font-bold text-red-700 hover:bg-red-100"
                    >
                      삭제
                    </button>
                  )}
                </div>

                <p className="whitespace-pre-wrap leading-7 text-gray-700">
                  {comment.content}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}