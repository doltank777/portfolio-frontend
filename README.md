# 📌 Portfolio Frontend (React)

React + Spring Boot 기반 게시판 포트폴리오 프로젝트의 프론트엔드입니다.
단순 CRUD 게시판이 아니라 로그인 인증, 게시글 작성/수정/삭제, 상세 조회, 조회수, 좋아요, 공통 레이아웃, Tailwind CSS 기반 UI 개선을 중심으로 구현하고 있습니다.

---

## 🚀 프로젝트 소개

이 프로젝트는 백엔드와 프론트엔드를 분리한 풀스택 포트폴리오 프로젝트입니다.

프론트엔드에서는 React 기반 SPA 구조를 사용하고, Axios를 통해 Spring Boot 백엔드 API와 통신합니다.  
실제 서비스에서 자주 사용되는 인증 처리, 게시글 관리, 사용자 경험 개선, 컴포넌트 구조화를 목표로 개발하고 있습니다.


---

## 🛠 기술 스택

### Frontend
- React
- Vite
- JavaScript
- React Router
- Axios
- Tailwind CSS


### Backend
- Spring Boot
- JWT Authentication
- MySQL
- Redis

### Database / Infra
- MySQL
- Docker

---

## ✨ 주요 기능

### 🔐 인증
- 회원가입
- 로그인
- JWT 토큰 localStorage 저장
- 로그인 상태에 따른 헤더 UI 변경
- 로그아웃 처리

### 📝 게시글
- 게시글 목록 조회
- 게시글 상세 조회
- 게시글 작성
- 게시글 수정
- 게시글 삭제
- 게시글 상세 페이지 이동

### ❤️ 좋아요
- 좋아요 토글 기능
- 좋아요 수 즉시 반영 (Optimistic UI 적용)

### 👁 조회수
- 게시글 상세 진입 시 조회수 증가
- 중복 증가 방지를 고려한 구조 설계

### 💬 댓글
- 댓글 작성 / 삭제
- 게시글별 댓글 목록 조회

### UI / UX

- Tailwind CSS 기반 화면 스타일링
- 공통 Layout 컴포넌트 구성
- Header 네비게이션 구성
- 로그인 여부에 따른 메뉴 표시
- 작성/수정/상세/목록 페이지 UI 개선

### API 연동

- Axios 기반 API 모듈 분리
- 인증 API 분리
- 게시글 API 분리
- 백엔드 서버와 REST API 통신

---

## 🖥 화면 구성

- 로그인 페이지
- 회원가입 페이지
- 게시글 목록 페이지
- 게시글 상세 페이지
- 게시글 작성 페이지
- 게시글 수정 페이지
- 공통 레이아웃 / 헤더

---

## ⚙️ 실행 방법

### Frontend
1. 프로젝트 설치
```bash
npm install
```
2. 개발 서버 실행 
```bash
npm run dev
```
3. 빌드
```bash
npm run build
```

### Backend

```bash
./gradlew bootRun
```

---

## 📂 프로젝트 구조 (Frontend)

```
src/
 ├── api/
 │   ├── axios.js
 │   ├── authApi.js
 │   └── postApi.js
 │
 ├── pages/
 │   ├── LoginPage.jsx
 │   ├── RegisterPage.jsx
 │   ├── PostListPage.jsx
 │   ├── PostDetailPage.jsx
 │   ├── PostWritePage.jsx
 │   └── PostEditPage.jsx
 │
 ├── routes/
 │   └── Router.jsx
 │
 ├── utils/
 │   └── auth.js
 │
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

---

## ⚙️ 환경 설정

백엔드 서버 주소는 Axios 설정 파일에서 관리합니다.
```Javascript
// src/api/axios.js
```
로컬 개발 환경에서는 Spring Boot 백엔드 서버가 먼저 실행되어 있어야 합니다.

---

## 🔥 주요 구현 포인트

### 🔐 인증 처리 (JWT 기반)
* 로그인 시 JWT 토큰을 localStorage에 저장
* 토큰 기반 사용자 인증 처리
* 로그인 상태에 따른 Header UI 분기
* 로그아웃 시 토큰 제거 및 상태 초기화

### 🧩 SPA 구조 및 라우팅
* React Router 기반 SPA 구조 구성
* 페이지 간 이동 시 상태 유지
* Layout 컴포넌트를 통한 공통 UI 관리
* 보호된 라우트 설계 (로그인 여부 기반 접근 제어 구조)

### API 통신 구조 설계
* Axios 인스턴스 분리 (axios.js)
* 인증 API / 게시글 API 모듈 분리
* 공통 요청 처리 구조 설계 (확장 가능 구조)
* 백엔드(Spring Boot)와 REST API 연동

### 📝 게시판 기능 (CRUD)
* 게시글 목록 조회
* 게시글 상세 조회
* 게시글 작성
* 게시글 수정
* 게시글 삭제
* 상세 페이지 이동 및 데이터 렌더링

### 🎨 UI/UX 개선 (Tailwind 기반)
* Tailwind CSS 적용으로 스타일 구조 단순화
* 공통 Layout 및 Header 구성
* 로그인 상태 기반 UI 변경
* 게시글 목록 / 상세 / 작성 / 수정 페이지 UI 개선
* 기존 styles 폴더 제거 → Tailwind 중심 구조로 리팩토링

### 🧱 컴포넌트 구조 설계
* 페이지 단위 컴포넌트 분리
* API / utils / routes 구조 분리
* 유지보수 및 확장성을 고려한 디렉토리 설계

---

🔗 백엔드 레포지토리

👉 https://github.com/doltank777/portfolio-backend

---

## 👨‍💻 개발자

* 이름: Y.YB
* GitHub: https://github.com/doltank777

---
