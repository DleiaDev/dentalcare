import { forwardRef } from "react";
import { Button as ButtonUI, ButtonProps } from "./ui/button";

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return <ButtonUI ref={ref} {...props} />;
});
Button.displayName = "Button";

export default Button;
