import { cn } from "@/lib/utils";
import {
  ChangeEvent,
  InputHTMLAttributes,
  MutableRefObject,
  ReactNode,
} from "react";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import { Controller, useFormContext } from "react-hook-form";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  labelDescription?: string;
  containerClassName?: string;
  additionalElements?: ReactNode;
  ref?: MutableRefObject<HTMLInputElement | null>;
};

export default function NumberInput({
  className,
  name,
  label,
  labelDescription,
  containerClassName,
  additionalElements,
  ref,
  ...props
}: Props) {
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
      {label && (
        <Label description={labelDescription} htmlFor={name}>
          {label}
        </Label>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...props}
            value={field.value ? `${field.value}` : ""}
            id={name}
            type="number"
            className={cn(
              "flex h-12 w-full rounded-md border border-border bg-transparent px-3 py-1 font-medium shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
              errorMessage
                ? "border-error ring-error/20"
                : "focus:border-primary ring-primary/20 ",
              className,
            )}
            onChange={(e) => handleChange(e, field.onChange)}
            ref={(element) => {
              field.ref(element);
              if (ref) ref.current = element;
            }}
          />
        )}
      />

      {typeof errorMessage === "string" && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
      {additionalElements}
    </div>
  );
}
