import * as React from 'react';
import { buttonStyle } from './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * 버튼 내부에 표시될 내용입니다.
   */
  children: React.ReactNode;
}

/**
 * 사용자와 상호작용을 위한 기본적인 버튼 컴포넌트입니다.
 */
export function Button({ children, ...props }: ButtonProps) {
  return (
    <button className={buttonStyle} type="button" {...props}>
      {children}
    </button>
  );
}
