# Bmart-7조

## 👨‍👨‍👧Contributors

- [![title](https://img.shields.io/badge/DEVELOPER-최범수-blue)](https://github.com/choibumsu)
- [![title](https://img.shields.io/badge/DEVELOPER-박지환-blue)](https://github.com/parkjihwanjay)
- [![title](https://img.shields.io/badge/DEVELOPER-김영지-blue)](https://github.com/blair-0404)

---

## ⛳️Team Rules

- [Ground rule](https://github.com/woowa-techcamp-2020/bmart-7/wiki/%E2%9C%85Ground-rule)
- [Development rule](https://github.com/woowa-techcamp-2020/bmart-7/wiki/%E2%9C%85development-rule)

---

## 🧞Quick Start

### 1. Clone & Install Packages

```bash
git clone https://github.com/woowa-techcamp-2020/bmart-7.git

cd client
npm install

cd ../server
npm install
```

### 2. Setup Environment Variables

- client
  - 개발환경 : .env.development
  - 배포환경 : .env.production
  - example(공통)
    - REACT_APP_GITHUB_CLIENT_ID=
    - REACT_APP_BASE_URL=
    - REACT_APP_S3_URL=
    - REACT_APP_GRAPHQL_URL=
- server

  - 개발환경 : .env.dev
  - 배포환경 : .env.prod
  - example
    - .env.dev
      - GITHUB_CLIENT_ID=
      - GITHUB_CLIENT_SECRET=
      - PEM_PATH=
      - SERVER_HOST=
      - SERVER_USER=
      - DB_PORT=
      - JWT_SECRET=
    - DB 연결을 위한 port forwarding을 위해 필요합니다.
    - .env.prod
      - GITHUB_CLIENT_ID=
      - GITHUB_CLIENT_SECRET=
      - JWT_SECRET=

## Pages Introduction

![](https://github.com/Blair-0404/test/blob/master/src/main1.gif)

---

![](https://github.com/Blair-0404/test/blob/master/src/main2.gif)

---

### MainPage

![](https://github.com/Blair-0404/test/blob/master/src/main.gif)

- 배너 / 카테고리 아이템
- 유저를 위한 상품을 추천
- 번쩍할인 리스트 : 할인율 높은 상품 추천
- 메인카테고리별 리스트
  - 스크롤할 시 헤더바 고정

### MainCategoryPage / CategoryPage

- 메인카테고리 아이템 클릭시 해당 카테고리 페이지로 이동
  - 세부 카테고리로도 이동가능

### SidePage

- 사이드아이콘 or 사이드 바 클릭시 사이드 페이지로 이동
- 타이틀 클릭 후 메인카테고리 페이지 이동가능

### Product(detail)Page

- 상품의 디테일한 정보를 담고있는 페이지
- 구매하기 버튼 클릭시 카트에 상품이 담김과 동시에 카드페이지로 이동

### CartPage

- 메인화면 오른쪽 하단 장바구니 아이콘 클릭시 카트페이지로 이동
- 리스트에서 체크박스를 클릭해서 전체선택 or 부분선택 가능
- 상품별 수량조절 / total금액, total수량 확인가능
- 삭제버튼 클릭시 알림창으로 재확인

## FavoritePage

- 사이드 페이지에서 찜한상품 클릭시 페이지 이동

### SearchPage / SearchResultPage

- 상품 검색 페이지
  - 단어입력시 관련된 상품 리스트가 보인다.
  - 클릭시 상품의 상세페이지로 이동

### Favorite btn

- 찜 버튼 클릭시 Favorite리스트에 담긴다.

### cart btn

- 장바구니 버튼 클릭시 장바구니에 담긴다.

### 땡겨요

- 메인화면에서 화면을 아래로 드래그 하듯 당기면 랜덤으로 메뉴를 추천해주는 떙겨요 구현

---

## 👨🏻‍💻 기술 스택

**Common**

- ![title](https://img.shields.io/badge/-TypeScript-007ACC?&logo=TypeScript&logoColor=white)
- ![title](https://img.shields.io/badge/-NPM-CB3837?&logo=NPM&logoColor=white)
- ![title](https://img.shields.io/badge/-ESLint-4B32C3?&logo=ESLint&logoColor=white)
- ![title](https://img.shields.io/badge/-Prettier-F7B93E?&logo=Prettier&logoColor=white)

**Frontend**

- ![title](https://img.shields.io/badge/-React-61DAFB?&logo=react&logoColor=white)
- ![title](https://img.shields.io/badge/-SCSS-CC6699?&logo=Sass&logoColor=white)
- ![title](https://img.shields.io/badge/-Webpack-7ac5f1?&logo=Webpack&logoColor=white)
- ![title](https://img.shields.io/badge/-Babel-eece4f?&logo=Babel&logoColor=white)

**Backend**

- ![title](https://img.shields.io/badge/-Node.js-339933?&logo=Node.js&logoColor=white)
- ![title](https://img.shields.io/badge/-Express-191919?&logo=Node.js&logoColor=white)
- ![title](https://img.shields.io/badge/-GraphQL-311C87?&logo=graphql&logoColor=white)
- ![title](https://img.shields.io/badge/-MySQL-4479A1?&logo=MySQL&logoColor=white)

**ETC**

- ![title](https://img.shields.io/badge/-EC2-232F3E?&logo=Amazon-AWS&logoColor=white)
- ![title](https://img.shields.io/badge/-Github-181717?&logo=Github&logoColor=white)
- ![title](https://img.shields.io/badge/-Slack-4A154B?&logo=Slack&logoColor=white)

---

## 🌎Database 설계

- [ERD](https://github.com/woowa-techcamp-2020/bmart-7/wiki/%E2%9C%85Table-%EC%84%A4%EA%B3%84)

---

---
