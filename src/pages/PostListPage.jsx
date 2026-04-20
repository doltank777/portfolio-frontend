import { useEffect, useState } from "react";
import { getPosts } from "../api/postApi";
import { Link } from "react-router-dom";

export default function PostListPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await getPosts();

      // Spring Page 객체의 content 꺼내기
      setPosts(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        width: "800px",
        margin: "50px auto",
        fontFamily: "sans-serif"
      }}
    >
      {/* 상단 헤더 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px"
        }}
      >
        <h2 style={{ margin: 0 }}>게시글 목록</h2>

        <Link
          to="/write"
          style={{
            padding: "10px 16px",
            backgroundColor: "#4f46e5",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px"
          }}
        >
          글쓰기
        </Link>
      </div>

      {/* 게시글 없을 때 */}
      {posts.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "80px 20px",
            border: "1px solid #eee",
            borderRadius: "12px",
            backgroundColor: "#fafafa"
          }}
        >
          <h3>등록된 게시글이 없습니다.</h3>
          <p>첫 번째 게시글을 작성해보세요.</p>

          <Link
            to="/write"
            style={{
              display: "inline-block",
              marginTop: "15px",
              padding: "10px 16px",
              backgroundColor: "#111827",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px"
            }}
          >
            첫 글 작성하기
          </Link>
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #eee",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "15px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
            }}
          >
            <Link
              to={`/posts/${post.id}`}
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                textDecoration: "none",
                color: "#111827"
              }}
            >
              {post.title}
            </Link>

            <div
              style={{
                marginTop: "10px",
                color: "#6b7280",
                fontSize: "14px"
              }}
            >
              작성자: {post.writer}
            </div>

            <div style={{ marginTop: "8px", fontSize: "14px" }}>
              ❤️ {post.likeCount || 0}
            </div>
            
          </div>
        ))
      )}
    </div>
  );
}