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

  useEffect(() => {
    loadPost();
    loadComments();
    loadLikes();
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

  const remove = async () => {
    const ok = window.confirm("게시글 삭제하시겠습니까?");
    if (!ok) return;

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
    return <div style={styles.loading}>로딩중...</div>;
  }

  const loginUser = getUsernameFromToken();
  const isWriter = loginUser === post.username;

  return (
    <div style={styles.container}>
      <div style={styles.postCard}>
        <h1 style={styles.title}>{post.title}</h1>

        <div style={styles.metaBox}>
          <span>작성자: {post.username}</span>
          <span>👀 조회수 {post.viewCount || 0}</span>
          <span>❤️ 좋아요 {likeCount}</span>
        </div>

        <hr style={styles.divider} />

        <div style={styles.content}>{post.content}</div>

        <div style={styles.buttonRow}>
          <button onClick={() => navigate("/")} style={styles.listButton}>
            목록
          </button>

          <button onClick={toggleLike} style={styles.actionButton}>
            ❤️ 좋아요
          </button>

          {isWriter && (
            <>
              <button
                onClick={() => navigate(`/posts/edit/${id}`)}
                style={styles.editButton}
              >
                수정
              </button>
              <button onClick={remove} style={styles.deleteButton}>
                삭제
              </button>
            </>
          )}
        </div>
      </div>

      <section style={styles.commentSection}>
        <h3 style={styles.commentTitle}>댓글</h3>

        <div style={styles.commentInputBox}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요."
            style={styles.textarea}
          />
          <button onClick={writeComment} style={styles.commentButton}>
            댓글 작성
          </button>
        </div>

        {comments.length === 0 ? (
          <p style={styles.emptyComment}>등록된 댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} style={styles.commentCard}>
              <div style={styles.commentTop}>
                <strong>{comment.username}</strong>
                {loginUser === comment.username && (
                  <button
                    onClick={() => removeComment(comment.id)}
                    style={styles.commentDeleteButton}
                  >
                    삭제
                  </button>
                )}
              </div>
              <p style={styles.commentText}>{comment.content}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "0 16px 40px",
  },
  loading: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "0 16px",
    fontSize: "18px",
  },
  postCard: {
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "28px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
  },
  title: {
    margin: "0 0 16px",
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
    lineHeight: 1.3,
  },
  metaBox: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    color: "#6b7280",
    fontSize: "14px",
    alignItems: "center",
  },
  divider: {
    margin: "20px 0",
    border: "none",
    borderTop: "1px solid #e5e7eb",
  },
  content: {
    minHeight: "200px",
    lineHeight: 1.8,
    whiteSpace: "pre-wrap",
    fontSize: "16px",
    color: "#1f2937",
  },
  buttonRow: {
    display: "flex",
    gap: "10px",
    marginTop: "24px",
    flexWrap: "wrap",
  },
  listButton: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#f3f4f6",
    color: "#111827",
    cursor: "pointer",
    fontWeight: "bold",
  },
  actionButton: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ffeded",
    color: "#b91c1c",
    cursor: "pointer",
    fontWeight: "bold",
  },
  editButton: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#eef4ff",
    color: "#1d4ed8",
    cursor: "pointer",
    fontWeight: "bold",
  },
  deleteButton: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ffecec",
    color: "#c62828",
    cursor: "pointer",
    fontWeight: "bold",
  },
  commentSection: {
    marginTop: "28px",
    backgroundColor: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
  },
  commentTitle: {
    margin: "0 0 16px",
    fontSize: "22px",
    color: "#111827",
  },
  commentInputBox: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "24px",
  },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    resize: "vertical",
    fontSize: "14px",
    boxSizing: "border-box",
    outline: "none",
  },
  commentButton: {
    alignSelf: "flex-end",
    padding: "10px 14px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#111827",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },
  emptyComment: {
    color: "#6b7280",
    margin: 0,
  },
  commentCard: {
    padding: "14px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    marginBottom: "12px",
    backgroundColor: "#f9fafb",
  },
  commentTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  commentDeleteButton: {
    padding: "6px 10px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#ffecec",
    color: "#c62828",
    cursor: "pointer",
    fontSize: "13px",
  },
  commentText: {
    margin: 0,
    whiteSpace: "pre-wrap",
    color: "#374151",
    lineHeight: 1.6,
  },
};