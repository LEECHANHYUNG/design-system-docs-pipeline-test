import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

interface VariantInfo {
  name: string;
  options: string[];
  type: string;
  defaultValue?: string;
}

export class VariantsExtractor {
  private program?: ts.Program;
  private checker?: ts.TypeChecker;

  constructor() {
    this.setupCompiler();
  }

  private setupCompiler(): void {
    const configOptions = ts.getDefaultCompilerOptions();
    this.program = ts.createProgram([], configOptions);
    this.checker = this.program.getTypeChecker();
  }

  /**
   * CSS 파일에서 variants 추출
   */
  public extractVariantsFromFile(filePath: string): VariantInfo[] {
    const absolutePath = path.resolve(filePath);

    const program = ts.createProgram(
      [absolutePath],
      ts.getDefaultCompilerOptions()
    );
    const sourceFile = program.getSourceFile(absolutePath);

    if (!sourceFile) {
      console.error(`Could not find or open the file: ${absolutePath}`);
      return [];
    }

    const variants: VariantInfo[] = [];

    const visit = (node: ts.Node) => {
      // recipe 함수 호출 찾기
      if (
        ts.isCallExpression(node) &&
        ts.isIdentifier(node.expression) &&
        node.expression.text === "recipe"
      ) {
        const recipeArg = node.arguments[0];
        if (ts.isObjectLiteralExpression(recipeArg)) {
          this.extractVariantsFromRecipe(recipeArg, variants);
          this.extractDefaultVariants(recipeArg, variants);
        }
      }

      ts.forEachChild(node, visit);
    };

    ts.forEachChild(sourceFile, visit);
    return variants;
  }

  private extractVariantsFromRecipe(
    recipeArg: ts.ObjectLiteralExpression,
    variants: VariantInfo[]
  ): void {
    // variants 속성 찾기
    const variantsProperty = recipeArg.properties.find(
      (prop) =>
        ts.isPropertyAssignment(prop) &&
        ts.isIdentifier(prop.name) &&
        prop.name.text === "variants"
    ) as ts.PropertyAssignment;

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
            type: options.map((opt) => `"${opt}"`).join(" | "),
          });
        }
      });
    }
  }

  private extractDefaultVariants(
    recipeArg: ts.ObjectLiteralExpression,
    variants: VariantInfo[]
  ): void {
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
      defaultVariantsProperty.initializer.properties.forEach((defaultProp) => {
        if (
          ts.isPropertyAssignment(defaultProp) &&
          ts.isIdentifier(defaultProp.name)
        ) {
          const variantName = defaultProp.name.text;
          const defaultValue = ts.isStringLiteral(defaultProp.initializer)
            ? defaultProp.initializer.text
            : undefined;

          // 기존 variant에 기본값 추가
          const variant = variants.find((v) => v.name === variantName);
          if (variant) {
            variant.defaultValue = defaultValue;
          }
        }
      });
    }
  }

  /**
   * 결과를 JSON 파일로 저장
   */
  public saveVariants(variants: VariantInfo[], outputPath: string): void {
    try {
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      fs.writeFileSync(outputPath, JSON.stringify(variants, null, 2), "utf-8");
      console.log(`Variants 정보가 저장되었습니다: ${outputPath}`);
    } catch (error) {
      console.error("파일 저장 중 오류 발생:", error);
    }
  }
}
