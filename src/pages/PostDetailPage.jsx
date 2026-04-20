import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { getUsernameFromToken } from "../utils/auth";

export default function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    loadPost();
    loadComments();
    loadLikes();
  }, []);

  // 게시글 조회
  const loadPost = async () => {
    try {
      const res = await api.get(`/posts/${id}`);
      setPost(res.data);
    } catch (error) {
      console.log(error);
      alert("게시글을 불러올 수 없습니다.");
      navigate("/");
    }
  };

  // 댓글 조회
  const loadComments = async () => {
    try {
      const res = await api.get(`/comments/${id}`);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 좋아요 수 조회
  const loadLikes = async () => {
    try {
      const res = await api.get(`/likes/${id}`);
      setLikeCount(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 좋아요 토글
  const toggleLike = async () => {
    try {
      const res = await api.post(`/likes/${id}`);
      alert(res.data);
      loadLikes();
    } catch (error) {
      console.log(error);
      alert("좋아요 실패");
    }
  };

  // 댓글 작성
  const writeComment = async () => {
    if (!content.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }

    try {
      await api.post(`/comments/${id}`, {
        content: content
      });

      setContent("");
      loadComments();
    } catch (error) {
      console.log(error);
      alert("댓글 작성 실패");
    }
  };

  // 댓글 삭제
  const removeComment = async (commentId) => {
    const ok = window.confirm("댓글 삭제하시겠습니까?");
    if (!ok) return;

    try {
      await api.delete(`/comments/${commentId}`);
      loadComments();
    } catch (error) {
      console.log(error);
      alert("댓글 삭제 실패");
    }
  };

  // 게시글 삭제
  const remove = async () => {
    const ok = window.confirm("게시글 삭제하시겠습니까?");
    if (!ok) return;

    try {
      await api.delete(`/posts/${id}`);
      alert("삭제 완료");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("삭제 실패");
    }
  };

  if (!post) {
    return <div style={{ padding: "50px" }}>로딩중...</div>;
  }

  const loginUser = getUsernameFromToken();
  const isWriter = loginUser === post.username;

  return (
    <div style={{ width: "700px", margin: "50px auto" }}>
      {/* 제목 */}
      <h1>{post.title}</h1>

      {/* 작성자 */}
      <div style={{ color: "#666", marginBottom: "20px" }}>
        작성자: {post.username}
      </div>

      <hr />

      {/* 본문 */}
      <div
        style={{
          minHeight: "250px",
          padding: "20px 0",
          lineHeight: "1.8"
        }}
      >
        {post.content}
      </div>

      {/* 좋아요 */}
      <div style={{ margin: "20px 0" }}>
        <button
          onClick={toggleLike}
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "30px",
            background: "#ff4757",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
          }}
        >
          ❤️ 좋아요 {likeCount}
        </button>
      </div>

      <hr />

      {/* 댓글 입력 */}
      <div style={{ marginTop: "20px" }}>
        <textarea
          rows="3"
          style={{
            width: "100%",
            padding: "10px"
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글 입력"
        />

        <button
          onClick={writeComment}
          style={{ marginTop: "10px" }}
        >
          댓글 등록
        </button>
      </div>

      {/* 댓글 목록 */}
      <div style={{ marginTop: "30px" }}>
        <h3>댓글 {comments.length}개</h3>

        {comments.length === 0 ? (
          <p>첫 댓글을 남겨보세요.</p>
        ) : (
          comments.map((comment) => {
            const commentWriter =
              comment.user?.username || comment.username;

            const isMyComment =
              loginUser === commentWriter;

            return (
              <div
                key={comment.id}
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px 0"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}
                >
                  <strong>{commentWriter}</strong>

                  {isMyComment && (
                    <button
                      onClick={() =>
                        removeComment(comment.id)
                      }
                      style={{
                        fontSize: "12px",
                        color: "red"
                      }}
                    >
                      삭제
                    </button>
                  )}
                </div>

                <div style={{ marginTop: "5px" }}>
                  {comment.content}
                </div>
              </div>
            );
          })
        )}
      </div>

      <hr />

      {/* 하단 버튼 */}
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px"
        }}
      >
        <button onClick={() => navigate("/")}>
          목록
        </button>

        {isWriter && (
          <>
            <button
              onClick={() =>
                navigate(`/posts/edit/${id}`)
              }
            >
              수정
            </button>

            <button onClick={remove}>
              삭제
            </button>
          </>
        )}
      </div>
    </div>
  );
}