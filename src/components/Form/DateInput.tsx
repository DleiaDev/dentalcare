import { type ComponentProps, type ReactNode, useId } from "react";
import { Controller } from "react-hook-form";
import { cn, mergeRefs } from "@/lib/utils";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

type BaseProps = Omit<
  ComponentProps<"input">,
  "name" | "value" | "defaultValue" | "onChange" | "type"
> & {
  label?: string;
  labelDescription?: string;
  containerClassName?: string;
  additionalElements?: ReactNode;
};

type FormProps = BaseProps & {
  name: string;
  value?: undefined;
  onValueChange?: (value: string) => void;
};

type ControlledProps = BaseProps & {
  name?: string;
  value: string;
  onValueChange: (value: string) => void;
};

type Props = FormProps | ControlledProps;

function UIComponent({
  id: idProp,
  className,
  label,
  labelDescription,
  containerClassName,
  errorMessage,
  additionalElements,
  onValueChange,
  ...props
}: ControlledProps & { errorMessage?: string }) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  return (
    <div className={cn("mb-7", containerClassName)}>
      {label && (
        <Label htmlFor={id} description={labelDescription}>
          {label}
        </Label>
      )}
      <input
        {...props}
        id={id}
        type="date"
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={
          cn(errorMessage && errorId, props["aria-describedby"]) || undefined
        }
        className={cn(
          "h-12 w-full rounded-md border border-border bg-transparent px-3 py-1 font-medium shadow-xs transition-colors placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          errorMessage
            ? "border-error ring-error/20"
            : "focus-visible:border-primary ring-primary/20",
          className,
        )}
        onChange={(e) => onValueChange(e.target.value)}
      />
      {errorMessage && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
      {additionalElements}
    </div>
  );
}

function FormWrapper({
  name,
  ref,
  onBlur,
  onValueChange,
  ...props
}: FormProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <UIComponent
          {...props}
          ref={mergeRefs(field.ref, ref)}
          name={name}
          value={field.value ?? ""}
          disabled={field.disabled ?? props.disabled}
          onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
          }}
          onValueChange={(value) => {
            field.onChange(value);
            onValueChange?.(value);
          }}
          errorMessage={fieldState.error?.message}
        />
      )}
    />
  );
}

export default function DateInput(props: Props) {
  if (props.value !== undefined) return <UIComponent {...props} />;
  return <FormWrapper {...props} />;
}
