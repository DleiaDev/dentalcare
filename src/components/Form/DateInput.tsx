import { cn } from "@/lib/utils";
import { forwardRef, InputHTMLAttributes } from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import { useFormContext } from "react-hook-form";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  containerClassName?: string;
};

const DateInput = forwardRef<HTMLInputElement, Props>(
  ({ className, name, label, containerClassName, ...props }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const field = register(name);
    const errorMessage = errors[name]?.message;

    return (
      <div className={cn("mb-7", containerClassName)}>
        {label && <Label htmlFor={name}>{label}</Label>}
        <input
          id={name}
          type="date"
          className={cn(
            "flex h-12 w-full rounded-md border border-border bg-transparent px-3 py-1 font-medium shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
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
DateInput.displayName = "DateInput";

export default DateInput;
