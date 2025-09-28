import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";

export interface TSConfigOptions {
  tsconfigPath?: string;
  rootDir?: string;
  customOptions?: Partial<ts.CompilerOptions>;
}

export class TSConfigManager {
  private compilerOptions: ts.CompilerOptions;
  private program?: ts.Program;
  private typeChecker?: ts.TypeChecker;

  constructor(options?: TSConfigOptions) {
    this.compilerOptions = this.loadCompilerOptions(options);
  }

  /**
   * TypeScript 설정을 로드합니다
   */
  private loadCompilerOptions(options?: TSConfigOptions): ts.CompilerOptions {
    let compilerOptions: ts.CompilerOptions;

    if (options?.tsconfigPath) {
      // 지정된 tsconfig 경로 사용
      compilerOptions = this.loadTsConfig(
        options.tsconfigPath,
        options.rootDir
      );
    } else {
      // 기본 설정 사용
      compilerOptions = this.getDefaultCompilerOptions();
    }

    // 사용자 정의 옵션이 있으면 병합
    if (options?.customOptions) {
      compilerOptions = { ...compilerOptions, ...options.customOptions };
    }

    return compilerOptions;
  }

  /**
   * tsconfig.json 파일을 읽고 파싱합니다
   */
  private loadTsConfig(
    tsconfigPath: string,
    rootDir?: string
  ): ts.CompilerOptions {
    try {
      const absolutePath = path.resolve(tsconfigPath);

      if (!fs.existsSync(absolutePath)) {
        console.warn(`tsconfig.json을 찾을 수 없습니다: ${absolutePath}`);
        return this.getDefaultCompilerOptions();
      }

      const configFile = ts.readConfigFile(absolutePath, ts.sys.readFile);
      if (configFile.error) {
        console.error("tsconfig 읽기 오류:", configFile.error.messageText);
        return this.getDefaultCompilerOptions();
      }

      const basePath = rootDir || path.dirname(absolutePath);
      const parsedConfig = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        basePath,
        undefined,
        absolutePath
      );

      if (parsedConfig.errors.length > 0) {
        console.warn("tsconfig 파싱 경고:", parsedConfig.errors);
      }

      console.log(`tsconfig 로드됨: ${absolutePath}`);
      return parsedConfig.options;
    } catch (error) {
      console.error("tsconfig 로드 실패:", error);
      return this.getDefaultCompilerOptions();
    }
  }

  /**
   * 기본 컴파일러 옵션을 반환합니다
   */
  private getDefaultCompilerOptions(): ts.CompilerOptions {
    return {
      target: ts.ScriptTarget.Latest,
      module: ts.ModuleKind.CommonJS,
      lib: ["es2020", "dom"],
      jsx: ts.JsxEmit.React,
      declaration: true,
      esModuleInterop: true,
      skipLibCheck: true,
      strict: true,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      allowSyntheticDefaultImports: true,
      resolveJsonModule: true,
      noEmit: true,
    };
  }

  /**
   * TypeScript 프로그램을 생성합니다
   */
  public createProgram(filePaths: string[]): ts.Program {
    try {
      this.program = ts.createProgram({
        rootNames: filePaths,
        options: this.compilerOptions,
        host: ts.createCompilerHost(this.compilerOptions),
      });

      this.typeChecker = this.program.getTypeChecker();
      console.log(`TypeScript 프로그램 생성됨 (파일 ${filePaths.length}개)`);

      return this.program;
    } catch (error) {
      console.error("프로그램 생성 실패:", error);
      throw error;
    }
  }

  /**
   * 단일 파일용 프로그램을 생성합니다
   */
  public createSingleFileProgram(filePath: string): ts.Program {
    const absolutePath = path.resolve(filePath);
    return this.createProgram([absolutePath]);
  }

  /**
   * 현재 컴파일러 옵션을 반환합니다
   */
  public getCompilerOptions(): ts.CompilerOptions {
    return this.compilerOptions;
  }

  /**
   * 현재 프로그램을 반환합니다
   */
  public getProgram(): ts.Program | undefined {
    return this.program;
  }

  /**
   * 현재 타입 체커를 반환합니다
   */
  public getTypeChecker(): ts.TypeChecker | undefined {
    return this.typeChecker;
  }

  /**
   * 프로그램에서 소스 파일을 가져옵니다
   */
  public getSourceFile(filePath: string): ts.SourceFile | undefined {
    if (!this.program) {
      console.warn(
        "프로그램이 생성되지 않았습니다. createProgram()을 먼저 호출하세요."
      );
      return undefined;
    }

    const absolutePath = path.resolve(filePath);
    return this.program.getSourceFile(absolutePath);
  }

  /**
   * 설정 정보를 출력합니다
   */
  public printConfig(): void {
    console.log("=== TypeScript 설정 정보 ===");
    console.log(
      `Target: ${ts.ScriptTarget[this.compilerOptions.target || ts.ScriptTarget.Latest]}`
    );
    console.log(
      `Module: ${ts.ModuleKind[this.compilerOptions.module || ts.ModuleKind.CommonJS]}`
    );
    console.log(
      `JSX: ${this.compilerOptions.jsx ? ts.JsxEmit[this.compilerOptions.jsx] : "None"}`
    );
    console.log(`Strict: ${this.compilerOptions.strict}`);
    console.log(
      `ModuleResolution: ${this.compilerOptions.moduleResolution ? ts.ModuleResolutionKind[this.compilerOptions.moduleResolution] : "Classic"}`
    );

    if (this.compilerOptions.baseUrl) {
      console.log(`BaseUrl: ${this.compilerOptions.baseUrl}`);
    }

    if (this.compilerOptions.paths) {
      console.log(
        `Paths: ${JSON.stringify(this.compilerOptions.paths, null, 2)}`
      );
    }
  }
}
