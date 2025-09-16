import * as React from "react";
import { inputGroupStyle, inputGroupItemStyle } from "./input-group.css";
import { Input, useRender } from "@base-ui-components/react";

const NOOP = () => {};

interface InputGroupContext {
  value?: string | number;
  setValue?: React.Dispatch<React.SetStateAction<string | number>>;
  maxlength?: number;
  invalid?: boolean;
  setMaxLength?: React.Dispatch<
    React.SetStateAction<string | number | null | undefined>
  >;
  setInvalid?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const InputGroupContext = React.createContext<InputGroupContext>({
  invalid: false,
  setValue: NOOP,
  setMaxLength: NOOP,
  maxlength: undefined,
  value: undefined,
  setInvalid: NOOP,
});

export const useInputGroupContext = (optional = true) => {
  const context = React.useContext(InputGroupContext);
  if (context.setValue === NOOP && !optional) {
    throw new Error(
      "useInputGroupContext must be used within an InputGroupProvider"
    );
  }
  return context;
};

/**
 * 여러 입력 요소를 그룹화하여 함께 표시하는 컴포넌트입니다.
 */
export const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ render, ...componentProps }: InputGroupProps, ref) => {
    const [value, setValue] = React.useState<string | number>("");
    const [maxLength, setMaxLength] = React.useState<
      number | string | undefined | null
    >(undefined);
    const [invalid, setInvalid] = React.useState<boolean>(false);

    const contextValue: InputGroupContext = React.useMemo(
      () => ({
        invalid,
        maxLength,
        value,
        setMaxLength,
        setValue,
        setInvalid,
      }),
      [value, maxLength, invalid, setMaxLength, setValue, setInvalid]
    );
    const element = useRender({
      render: render || <div />,
      props: componentProps,
      ref,
    });

    console.log(value);
    return (
      <InputGroupContext.Provider value={contextValue}>
        {element}
      </InputGroupContext.Provider>
    );
  }
);

export interface InputGroupProps extends useRender.ComponentProps<"div"> {
  /**
   * InputGroup 내부에 표시될 자식 요소들입니다.
   */
  children: React.ReactNode;
  /**
   * 추가적인 CSS 클래스입니다.
   */
  className?: string;
}
