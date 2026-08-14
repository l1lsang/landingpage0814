# 탐정법인 정성 랜딩페이지

`렌딩페이지.svg`의 메인 데스크톱·모바일 구성을 React 컴포넌트와 반응형 CSS로 옮긴 랜딩페이지 골격입니다. 상담 폼은 Vercel Function을 거쳐 Firebase Firestore의 `consultationRequests` 컬렉션에 저장됩니다.

## 실행

```bash
npm install
npm run dev
```

Vite 개발 서버는 화면 확인용입니다. 상담 API까지 로컬에서 확인하려면 Vercel CLI로 프로젝트를 연결한 뒤 아래 명령을 사용합니다.

```bash
vercel dev
```

## Firebase / Vercel 환경 변수

`.env.example`을 참고해 Vercel 프로젝트의 Development, Preview, Production 환경에 다음 값을 등록합니다.

- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

`FIREBASE_PRIVATE_KEY`는 줄바꿈을 `\n`으로 보존해 입력합니다. 브라우저에는 Firebase 관리자 인증정보가 포함되지 않으며, Firestore 쓰기는 `api/consultations.ts`에서만 수행됩니다.

`firebase/firestore.rules`는 클라이언트의 직접 읽기·쓰기를 막는 기본 규칙입니다. Firebase Admin SDK를 사용하는 Vercel Function은 이 규칙과 별도로 서버 권한으로 저장합니다.

## 확인 명령

```bash
npm run lint
npm run build
```

실제 운영 전에는 `src/App.tsx`의 전화번호, 사업자 정보, 개인정보처리방침 링크와 문구를 확정해야 합니다.
