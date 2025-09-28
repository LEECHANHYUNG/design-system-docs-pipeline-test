import * as React from "react";
import { buttonRecipe, type ButtonVariants } from "./button.css";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    ButtonVariants {
  /**
   * 버튼 내부에 표시될 내용입니다.
   */
  children: React.ReactNode;
}

/*
 * 사용자와 상호작용을 위한 기본적인 버튼 컴포넌트입니다.
 */
export function Button({ children, color = "primary", ...props }: ButtonProps) {
  return (
    <button className={buttonRecipe({ color })} type="button" {...props}>
      {children}
    </button>
  );
}
