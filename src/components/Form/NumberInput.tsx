import { cn } from "@/lib/utils";
import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import { Controller, useFormContext } from "react-hook-form";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  containerClassName?: string;
};

const NumberInput = forwardRef<HTMLInputElement, Props>(
  ({ className, name, label, containerClassName, ...props }, ref) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();
    const errorMessage = errors[name]?.message;

    const handleChange = (
      e: ChangeEvent<HTMLInputElement>,
      onFieldChange: (value: number) => void,
    ) => {
      const value = Number(e.target.value);
      if (Number.isNaN(value)) return;
      onFieldChange(value);
    };

    return (
      <div className={cn("mb-7", containerClassName)}>
        {label && <Label htmlFor={name}>{label}</Label>}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...props}
              value={field.value}
              id={name}
              type="number"
              className={cn(
                "flex h-12 w-full rounded-md border border-border bg-transparent px-3 py-1 font-medium shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
                errorMessage
                  ? "border-error ring-error/20"
                  : "focus:border-primary ring-primary/20 ",
                className,
              )}
              onBlur={field.onBlur}
              onChange={(e) => handleChange(e, field.onChange)}
              ref={(element) => {
                field.ref(element);
              }}
            />
          )}
        />

        {typeof errorMessage === "string" && (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        )}
      </div>
    );
  },
);
NumberInput.displayName = "NumberInput";

export default NumberInput;
