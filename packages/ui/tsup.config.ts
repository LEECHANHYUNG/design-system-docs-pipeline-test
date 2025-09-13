import { defineConfig } from 'tsup';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true, // .d.ts 타입 정의 파일 생성
  splitting: false,
  sourcemap: true,
  clean: true, // 빌드 전 dist 폴더 정리
  esbuildPlugins: [
    vanillaExtractPlugin(), // Vanilla-Extract 플러그인 추가
  ],
});
