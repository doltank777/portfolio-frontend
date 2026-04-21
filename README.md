# 📌 Portfolio Project (Frontend)

React + Spring Boot 기반의 게시판 포트폴리오 프로젝트입니다.
실제 서비스 구조를 고려하여 **조회수, 좋아요, 인증, 성능 개선**을 중심으로 개발하고 있습니다.

---

## 🚀 프로젝트 소개

* 사용자 인증 기반 게시판 서비스
* 조회수 / 좋아요 / CRUD 기능 구현
* Redis를 활용한 성능 최적화 구조 적용
* 실제 서비스 수준의 구조 설계 및 구현 목표

---

## 🛠 기술 스택

### Frontend

* React
* Axios
* CSS

### Backend

* Spring Boot
* JPA (Hibernate)
* Redis

### Database / Infra

* MySQL
* Docker

---

## 📌 주요 기능

* 게시글 CRUD
* 게시글 상세 조회
* 조회수 증가 기능 (중복 방지 처리)
* 좋아요 기능 (Redis 기반 처리)
* 사용자 인증 (JWT 예정 / 적용 중)

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
 ├── pages/
 ├── components/
 ├── api/
 ├── styles/
```

---

## 🚧 진행 상태

현재 프로젝트는 지속적으로 개발 중입니다.

* 조회수 기능 개선 진행
* 좋아요 UI 고도화 예정
* 인증 기능 확장 예정
* UX/UI 개선 진행 중

---

## 💡 개선 및 설계 포인트

* 조회수 중복 증가 방지를 위한 로직 설계
* Redis를 활용한 좋아요 처리 성능 개선
* 프론트/백엔드 분리 구조 설계
* 실제 서비스 구조 기반 API 설계

---

## 👨‍💻 개발자

* 이름: Y.YB
* GitHub: https://github.com/doltank777

---
