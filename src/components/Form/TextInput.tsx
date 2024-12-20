import get from "lodash.get";
import { ChangeEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

type Props = {
  name?: string;
  value?: string;
  label?: string;
  className?: string;
  containerClassName?: string;
  autoFocus?: boolean;
  onValueChange?: (value: string) => void;
};

function UIComponent({
  className,
  name,
  label,
  containerClassName,
  errorMessage,
  value,
  onValueChange,
  ...props
}: Props & {
  onValueChange: Exclude<Props["onValueChange"], undefined>;
  errorMessage?: string;
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onValueChange(e.target.value);
  };

  return (
    <div className={cn("mb-7", containerClassName)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <input
        {...props}
        value={value ?? ""}
        id={name}
        type="text"
        className={cn(
          "flex h-12 w-full rounded-md border border-border bg-transparent px-3 py-1 font-medium shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          errorMessage
            ? "border-error ring-error/20"
            : "focus:border-primary ring-primary/20 ",
          className,
        )}
        onChange={handleChange}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}

function FormWrapper({
  name,
  onValueChange,
  ...props
}: Props & { name: string }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = get(errors, name)?.message;
  const handleValueChange = (
    value: string,
    onFieldChange: Exclude<Props["onValueChange"], undefined>,
  ) => {
    onFieldChange(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <UIComponent
          {...props}
          name={name}
          value={field.value}
          onValueChange={(value) => handleValueChange(value, field.onChange)}
          errorMessage={
            typeof errorMessage === "string" ? errorMessage : undefined
          }
        />
      )}
    />
  );
}

export default function TextInput({
  name,
  value,
  onValueChange,
  ...props
}: Props) {
  if (name !== undefined && value === undefined)
    return <FormWrapper {...props} name={name} onValueChange={onValueChange} />;
  if (
    name === undefined &&
    typeof value === "string" &&
    onValueChange !== undefined
  )
    return (
      <UIComponent {...props} value={value} onValueChange={onValueChange} />
    );
}
