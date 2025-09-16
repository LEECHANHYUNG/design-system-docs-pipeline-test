import * as React from "react";
import { inputStyle, inputLabelStyle } from "./input.css";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * 입력 필드의 라벨입니다.
   */
  label?: string;
}

/**
 * 사용자 입력을 위한 기본적인 입력 필드 컴포넌트입니다.
 */
export function Input({ label, ...props }: InputProps) {
  return (
    <div>
      {label && <label className={inputLabelStyle}>{label}</label>}
      <input className={inputStyle} {...props} />
    </div>
  );
}
