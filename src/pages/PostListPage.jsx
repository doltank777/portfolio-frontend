import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/postApi";

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
    return <div style={styles.loading}>게시글 목록을 불러오는 중입니다...</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>게시글 목록</h1>
          <p style={styles.subtitle}>포트폴리오 게시판의 전체 게시글을 확인할 수 있습니다.</p>
        </div>

        <Link to="/posts/write" style={styles.writeButton}>
          글쓰기
        </Link>
      </div>

      {posts.length === 0 ? (
        <div style={styles.emptyBox}>
          <h2 style={styles.emptyTitle}>등록된 게시글이 없습니다.</h2>
          <p style={styles.emptyText}>첫 번째 게시글을 작성해서 게시판을 시작해보세요.</p>
          <Link to="/posts/write" style={styles.emptyButton}>
            첫 글 작성하기
          </Link>
        </div>
      ) : (
        <div style={styles.list}>
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              style={styles.card}
            >
              <div style={styles.cardTop}>
                <h2 style={styles.cardTitle}>{post.title}</h2>
              </div>

              <div style={styles.metaRow}>
                <span style={styles.metaText}>작성자: {post.username}</span>
                <span style={styles.metaText}>
                  작성일: {formatDate(post.createdAt)}
                </span>
              </div>

              <div style={styles.infoRow}>
                <span style={styles.infoBadge}>❤️ 좋아요 {post.likeCount || 0}</span>
                <span style={styles.infoBadge}>👀 조회수 {post.viewCount || 0}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "960px",
    margin: "40px auto",
    padding: "0 16px 40px",
  },
  loading: {
    maxWidth: "960px",
    margin: "40px auto",
    padding: "0 16px",
    fontSize: "18px",
    color: "#374151",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    marginBottom: "28px",
    flexWrap: "wrap",
  },
  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    margin: "10px 0 0",
    color: "#6b7280",
    fontSize: "15px",
  },
  writeButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 18px",
    borderRadius: "10px",
    backgroundColor: "#111827",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "700",
    minWidth: "96px",
  },
  emptyBox: {
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "48px 24px",
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
  },
  emptyTitle: {
    margin: "0 0 12px",
    fontSize: "24px",
    color: "#111827",
  },
  emptyText: {
    margin: "0 0 20px",
    color: "#6b7280",
    fontSize: "15px",
  },
  emptyButton: {
    display: "inline-block",
    padding: "12px 18px",
    borderRadius: "10px",
    backgroundColor: "#111827",
    color: "#ffffff",
    textDecoration: "none",
    fontWeight: "700",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  card: {
    display: "block",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "22px",
    textDecoration: "none",
    color: "inherit",
    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },
  cardTop: {
    marginBottom: "14px",
  },
  cardTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "700",
    color: "#111827",
    lineHeight: 1.4,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "14px",
  },
  metaText: {
    fontSize: "14px",
    color: "#6b7280",
  },
  infoRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  },
  infoBadge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 12px",
    borderRadius: "999px",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    fontSize: "14px",
    fontWeight: "600",
    color: "#374151",
  },
};