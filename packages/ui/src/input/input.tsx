import * as React from "react";
import { inputStyle } from "./input.css";
import { useInputGroupContext } from "../input-group/input-group";
import { useRender } from "@base-ui-components/react";
import { useControlled } from "@base-ui-components/utils/useControlled";

// InputGroup의 컨텍스트를 선택적으로 사용할 수 있도록 수정
// 컨텍스트가 있으면 그룹의 상태 공유, 없으면 독립적으로 작동
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      type = "text",
      disabled = false,
      value: propValue,
      maxlength: propMaxLength,
      onChange: propOnChange,
      invalid: propInvalid,
      defaultValue: propDefaultValue,
      className,
      ...props
    }: InputProps,
    ref
  ) => {
    const {
      value: contextValue,
      maxlength: contextMaxLength,
      invalid: contextInvalid,
      setValue,
    } = useInputGroupContext(true);

    const maxlength = contextMaxLength || propMaxLength;
    const invalid = contextInvalid || propInvalid;

    const [inputValue, setInputValue] = useControlled({
      controlled: contextValue || propValue,
      default: propDefaultValue,
      name: "FieldControl",
      state: "value",
    });
    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setValue) {
          setValue(e.target.value);
        }
        setInputValue(e.target.value);
      },
      [setValue, propOnChange]
    );

    return useRender({
      render: <input />,
      props: {
        className: `${inputStyle} ${invalid ? "invalid" : ""} ${
          className || ""
        }`,
        placeholder,
        type,
        disabled,
        value: inputValue,
        maxLength: maxlength,
        onChange: handleChange,
        ...props,
      },
      ref,
    });
  }
);
export interface InputProps extends useRender.ComponentProps<"input"> {
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  disabled?: boolean;
  value?: string | number;
  maxlength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalid?: boolean;
  className?: string;
  defaultValue?: React.ComponentProps<"input">["defaultValue"];
}
