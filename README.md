# My javascript study

## 시작하기 전에

- [Node.js](https://nodejs.org/)를 사용하여 빌드하므로 이미 설치되어 있지 않다면 Node.js를 먼저 설치합니다.
- Node.js는 최신 LTS 버전을 사용합니다.
- NPM 패키지 관리는 [Yarn](https://yarnpkg.com/en/docs/install)을 사용합니다.
- 코드 스타일 통일을 위해 [EditorConfig](http://editorconfig.org/#download), [Prettier](https://prettier.io/) 사용합니다. 따라서 이 기능(혹은 플러그인)을 제공하는 에디터를 사용합니다.

## 시작하기

저장소 클론 후 `yarn` 명령을 실행하여 의존 패키지를 설치

## NPM Scripts

- `yarn clean`: 빌드되어 생성된 파일들 삭제
- `yarn start`: 개발용 빌드 및 서버 실행
- `yarn build`: production 빌드
  - 용량 최소화 등 추가 작업이 수행됨
  - demo 디렉토리에 생성된 내용을 mockupdev 배포 시 사용
- `yarn build:dev`: dev 서버 배포용 빌드
- `yarn build:prod`: 운영 배포용 빌드
- `yarn doc`: API 문서만 빌드
- `yarn prettier-js`: Prettier 규칙에 어긋나는 JS 파일 일괄 수정
- `yarn prettier-less`: Prettier 규칙에 어긋나는 Less 파일 일괄 수정

## Gulp Tasks

`yarn start --tasks-simple`로 사용 가능한 Gulp 태스크 확인 가능합니다. 다음과 같이 `yarn start` 뒤에 태스크명을 사용하여 해당 태스크만 실행할 수 있습니다.

```
yarn start img
yarn start html
yarn start css
yarn start js
```

## 프로젝트 디렉토리 구조

- demo/: 빌드된 파일
- doc/: API 문서
- tasks/: Gulp 빌드 테스크 파일들
- src/: 모든 소스 코드를 담고 있습니다.
  - index.js: bundle.js 파일 생성 시 엔트리 파일
  - index.html: 테스트를 위한 HTML 파일
  - polyfills/: 브라우저 폴리필
  - util/: 범용 유틸
