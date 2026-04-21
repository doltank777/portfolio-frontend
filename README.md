# 📌 Portfolio Frontend (React)

React + Spring Boot 기반의 **게시판 포트폴리오 프로젝트 (Frontend)** 입니다.  
실제 서비스 구조를 고려하여 **인증, 조회수, 좋아요, 성능 개선**을 중심으로 구현하였습니다.

---

## 🚀 프로젝트 소개

사용자 인증 기반으로 동작하는 게시판 서비스입니다.  
단순 CRUD를 넘어서 **조회수, 좋아요, 상태 관리, UX 개선**까지 포함하여  
실제 서비스 수준의 구조를 목표로 개발했습니다.

---

## 🛠 기술 스택

### Frontend
- React (Vite)
- JavaScript (ES6+)
- Axios
- React Router
- CSS-in-JS (Style Object 기반)

### Backend
- Spring Boot
- JPA (Hibernate)
- Redis

### Database / Infra
- MySQL
- Docker

---

## ✨ 주요 기능

### 🔐 인증
- 회원가입 / 로그인
- JWT 토큰 기반 인증 처리
- localStorage를 활용한 토큰 관리

### 📝 게시글
- 게시글 목록 조회 (페이징)
- 게시글 상세 조회
- 게시글 작성 / 수정 / 삭제

### ❤️ 좋아요
- 좋아요 토글 기능
- 좋아요 수 즉시 반영 (Optimistic UI 적용)

### 👁 조회수
- 게시글 상세 진입 시 조회수 증가
- 중복 증가 방지를 고려한 구조 설계

### 💬 댓글
- 댓글 작성 / 삭제
- 게시글별 댓글 목록 조회

---

## 🖥 화면 구성

- 게시글 목록 페이지
- 게시글 상세 페이지
- 게시글 작성 / 수정 페이지
- 로그인 / 회원가입 페이지
- 공통 헤더 (네비게이션)

---

## ⚙️ 실행 방법

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
./gradlew bootRun
```

---

## 📂 프로젝트 구조 (Frontend)

```
src/
 ├── api/         # API 통신 모듈
 ├── pages/       # 페이지 컴포넌트
 ├── components/  # 공통 컴포넌트 (Layout 등)
 ├── styles/      # 공통 스타일 (form, auth 등)
 ├── utils/       # 인증, 토큰 처리
```

---

💡 주요 구현 포인트
1. 상태 기반 UI 처리
 - 좋아요 클릭 시 서버 응답을 기다리지 않고 즉시 UI 반영
 - 사용자 경험(UX) 개선
2. 공통 스타일 구조 설계
 - postFormStyles / authFormStyles 분리
 - 재사용 가능한 UI 구조 구성
3. 인증 구조 설계
 - JWT 토큰 기반 인증 처리
 - localStorage + Axios 인터셉터 활용 가능 구조
4. 레이아웃 분리
 - Layout 컴포넌트로 공통 헤더 관리
 - 페이지 간 일관성 유지
5. API 모듈화
- API 요청을 별도 파일로 분리
- 유지보수성과 확장성 고려

---

🔗 백엔드 레포지토리

👉 https://github.com/doltank777/portfolio-backend

---

## 🚧 향후 개선 계획

* 댓글 UI 고도화
* 에러 처리 UX 개선
* 다크모드 지원
* 배포 및 환경 분리 (Dev / Prod)
* 이미지 업로드 기능

---

## 👨‍💻 개발자

* 이름: Y.YB
* GitHub: https://github.com/doltank777

---
