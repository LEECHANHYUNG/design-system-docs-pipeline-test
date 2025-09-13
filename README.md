# Design System Docs Pipeline Test

## 소개

이 프로젝트는 디자인 시스템의 문서 파이프라인을 테스트하기 위한 모노레포입니다. Next.js, React, TypeScript를 사용하여 구축되었으며, Turborepo를 통해 모노레포를 관리하고 Storybook을 통해 컴포넌트를 문서화합니다. 디자인 시스템의 컴포넌트를 효율적으로 개발, 테스트, 문서화할 수 있는 환경을 제공합니다.

## 목차

- [설치](#설치)
- [사용법](#사용법)
- [프로젝트 구조](#프로젝트-구조)

## 설치

프로젝트를 로컬에서 실행하기 위해 다음 단계를 따르세요:

1. **의존성 설치**:

   ```sh
   pnpm install
   ```

2. **환경 설정**:
   Node.js 18 이상과 pnpm이 설치되어 있어야 합니다.

3. **개발 서버 실행**:
   ```sh
   pnpm dev
   ```

## 사용법

### 개발 모드

- 전체 프로젝트 개발: `pnpm dev`
- 웹사이트만 개발: `pnpm dev --filter=website`
- Storybook 실행: `pnpm storybook`

### 빌드

- 전체 빌드: `pnpm build`
- 특정 패키지 빌드: `pnpm build --filter=ui`

### 테스트

- 테스트 실행: `pnpm test`

## 프로젝트 구조

이 모노레포는 다음과 같은 구조로 구성되어 있습니다:

- `apps/website/`: fumadocs 기반 문서 사이트
- `packages/ui/`: 공유 React 컴포넌트 라이브러리

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
