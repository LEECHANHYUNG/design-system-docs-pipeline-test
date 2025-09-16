import * as React from "react";
import { inputGroupStyle, inputGroupItemStyle } from "./input-group.css";

export interface InputGroupProps {
  /**
   * InputGroup 내부에 표시될 자식 요소들입니다.
   */
  children: React.ReactNode;
  /**
   * 추가적인 CSS 클래스입니다.
   */
  className?: string;
}

/**
 * 여러 입력 요소를 그룹화하여 함께 표시하는 컴포넌트입니다.
 */
export function InputGroup({ children, className }: InputGroupProps) {
  return (
    <div className={`${inputGroupStyle} ${className || ""}`}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className={inputGroupItemStyle}>
          {child}
        </div>
      ))}
    </div>
  );
}
