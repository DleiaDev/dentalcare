import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import { useFormContext } from "react-hook-form";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

const EmailInput = forwardRef<HTMLInputElement, Props>(
  ({ className, name, label, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const field = register(name);
    const errorMessage = errors[name]?.message;

    return (
      <div className="mb-7">
        <Label htmlFor={name}>{label}</Label>
        <input
          id={name}
          type="email"
          className={cn(
            "flex h-12 w-full rounded-md border border-border bg-transparent px-3 py-1 font-medium shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
            errorMessage
              ? "border-error ring-error/20"
              : "focus:border-primary ring-primary/20 ",
            className,
          )}
          {...props}
          {...field}
          ref={(element) => {
            field.ref(element);
          }}
        />
        {typeof errorMessage === "string" && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </div>
    );
  },
);
EmailInput.displayName = "EmailInput";

export default EmailInput;
