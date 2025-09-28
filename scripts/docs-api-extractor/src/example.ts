import { VariantsExtractor, TSConfigManager } from "./index";

function generateDocumentation() {
  const filePath = "../../packages/ui/src/button/button.css.ts";

  // VariantsExtractor 인스턴스 생성 (TSConfig 옵션 전달)
  const extractor = new VariantsExtractor({});

  // CSS 파일에서 variants 추출
  const variants = extractor.extractVariantsFromFile(filePath);

  // 결과 저장
  extractor.saveVariants(variants, "./output/variants.json");
}

generateDocumentation();
