import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../api/postApi";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await getPosts();
      setPosts(res.data.content || []);
    } catch (error) {
      console.log(error);
      alert("게시글 목록을 불러오지 못했습니다.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>게시글 목록</h2>
        <Link to="/posts/write" style={styles.writeButton}>
          글쓰기
        </Link>
      </div>

      {posts.length === 0 ? (
        <div style={styles.emptyBox}>
          <h3>등록된 게시글이 없습니다.</h3>
          <p>첫 번째 게시글을 작성해보세요.</p>
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
              <h3 style={styles.cardTitle}>{post.title}</h3>

              <div style={styles.metaRow}>
                <span>작성자: {post.writer || post.username}</span>
              </div>

              <div style={styles.infoRow}>
                <span>❤️ 좋아요 {post.likeCount || 0}</span>
                <span>👀 조회수 {post.viewCount || 0}</span>
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
    maxWidth: "900px",
    margin: "40px auto",
    padding: "0 16px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  title: {
    margin: 0,
  },
  writeButton: {
    padding: "10px 16px",
    backgroundColor: "#222",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
  emptyBox: {
    padding: "48px 24px",
    textAlign: "center",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    backgroundColor: "#fafafa",
  },
  emptyButton: {
    display: "inline-block",
    marginTop: "16px",
    padding: "10px 16px",
    backgroundColor: "#222",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  card: {
    display: "block",
    padding: "20px",
    border: "1px solid #e5e5e5",
    borderRadius: "12px",
    textDecoration: "none",
    color: "#111",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  },
  cardTitle: {
    margin: "0 0 12px",
  },
  metaRow: {
    marginBottom: "10px",
    color: "#666",
    fontSize: "14px",
  },
  infoRow: {
    display: "flex",
    gap: "16px",
    color: "#444",
    fontSize: "14px",
    fontWeight: "500",
  },
};