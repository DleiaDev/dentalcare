import { cn } from "@/lib/utils";
import { forwardRef, TextareaHTMLAttributes } from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import { useFormContext } from "react-hook-form";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label: string;
  labelDescription?: string;
  containerClassName?: string;
};

const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  (
    { className, name, label, labelDescription, containerClassName, ...props },
    ref,
  ) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const field = register(name);
    const errorMessage = errors[name]?.message;

    return (
      <div className={cn("mb-7", containerClassName)}>
        <Label htmlFor={name} description={labelDescription}>
          {label}
        </Label>
        <textarea
          id={name}
          className={cn(
            "flex w-full rounded-md border border-border bg-transparent px-3 py-1 font-medium shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
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
TextArea.displayName = "TextArea";

export default TextArea;
