## pingping 이상형 월드컵

핑핑은 나만의 이상형 월드컵을 만들고 사용자들과 공유하는 공간이에요.

## 개발 환경

`macOS monterey 12.3 macbook air M1`

`node v18.18.0`

`npm 9.8.1`

## 실행하기

```js
// 아래 .env 설정하기
git clone https://github.com/danpoj/pp.git
cd pp
npm i
npm run dev
```

## .env

```js
# planetscale
DATABASE_URL=
PLANETSCALE_USERNAME=
PLANETSCALE_PASSWORD=

# next auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
KAKAO_CLIENT_ID=
KAKAO_CLIENT_SECRET=
NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=

# aws s3
ACCESS_KEY=
SECRET_KEY=
BUCKET_NAME=
REGION=
NEXT_PUBLIC_S3_BASEURL=

# google analytics
NEXT_PUBLIC_GOOGLE_ID=
```

## 기술 스택

- 프레임워크 - `next v14.0.0@latest` `react v.18.2.0@latest`
- 데이터베이스 - `mysql`
- ORM - `prisma`
- 배포 - `vercel` `planetscale` `cloudflare cdn` `pwa`
- css - `tailwind`, `radix-ui`, `shadcn-ui`
- 이미지 저장 - `aws s3`

## 프로젝트 구조

<img width="864" alt="스크린샷 2023-11-05 오후 4 23 23" src="https://github.com/danpoj/pp/assets/88086373/d532f4b4-aa50-44d4-bb58-9fb771928d5c">
