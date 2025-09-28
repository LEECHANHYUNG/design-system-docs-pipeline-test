import { VariantsExtractor } from './index';

function generateDocumentation() {
  const filePath = "../../packages/ui/src/button/button.css.ts";
  
  // VariantsExtractor 인스턴스 생성
  const extractor = new VariantsExtractor();
  
  // CSS 파일에서 variants 추출
  const variants = extractor.extractVariantsFromFile(filePath);
  
  console.log('추출된 variants:', variants);
  
  // 결과 저장
  extractor.saveVariants(variants, "./output/variants.json");
}

generateDocumentation();

  const program = ts.createProgram([filePath], configOptions);
  const sourceFile = program.getSourceFile(filePath);
  const checker = program.getTypeChecker();

  if (!sourceFile) {
    console.error(`Could not find or open the file: ${filePath}`);
    return;
  }

  const variants: any[] = [];

  function visit(node: ts.Node) {
    // recipe 함수 호출 찾기
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "recipe"
    ) {
      const recipeArg = node.arguments[0];
      if (ts.isObjectLiteralExpression(recipeArg)) {
        // variants 속성 찾기
        const variantsProperty = recipeArg.properties.find(
          (prop) =>
            ts.isPropertyAssignment(prop) &&
            ts.isIdentifier(prop.name) &&
            prop.name.text === "variants"
        ) as ts.PropertyAssignment;
        console.log(variantsProperty);

        if (
          variantsProperty &&
          ts.isObjectLiteralExpression(variantsProperty.initializer)
        ) {
          // 각 variant (color, size 등) 추출
          variantsProperty.initializer.properties.forEach((variantProp) => {
            if (
              ts.isPropertyAssignment(variantProp) &&
              ts.isIdentifier(variantProp.name)
            ) {
              const variantName = variantProp.name.text;
              const options: string[] = [];

              // variant 옵션들 (primary, secondary 등) 추출
              if (ts.isObjectLiteralExpression(variantProp.initializer)) {
                variantProp.initializer.properties.forEach((option) => {
                  if (
                    ts.isPropertyAssignment(option) &&
                    ts.isIdentifier(option.name)
                  ) {
                    options.push(option.name.text);
                  }
                });
              }

              variants.push({
                name: variantName,
                options: options,
              });
            }
          });
        }

        // defaultVariants에서 기본값 추출
        const defaultVariantsProperty = recipeArg.properties.find(
          (prop) =>
            ts.isPropertyAssignment(prop) &&
            ts.isIdentifier(prop.name) &&
            prop.name.text === "defaultVariants"
        ) as ts.PropertyAssignment;

        if (
          defaultVariantsProperty &&
          ts.isObjectLiteralExpression(defaultVariantsProperty.initializer)
        ) {
          defaultVariantsProperty.initializer.properties.forEach(
            (defaultProp) => {
              if (
                ts.isPropertyAssignment(defaultProp) &&
                ts.isIdentifier(defaultProp.name)
              ) {
                const variantName = defaultProp.name.text;
                const defaultValue = defaultProp.initializer
                  .getText()
                  .replace(/['"]/g, "");
                // 기존 variant에 기본값 추가
                const variant = variants.find((v) => v.name === variantName);
                if (variant) {
                  variant.defaultValue = defaultValue;
                }
              }
            }
          );
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  ts.forEachChild(sourceFile, visit);

  fs.writeFileSync("./output/variants.json", JSON.stringify(variants, null, 2));
}

generateDocumentation();
