import { type ComponentProps } from "react";
import { Controller, type RegisterOptions } from "react-hook-form";
import { cn, mergeRefs } from "@/lib/utils";

type BaseProps = Omit<
  ComponentProps<"input">,
  "name" | "value" | "defaultValue" | "onChange" | "type"
>;

type FormProps = BaseProps & {
  name: string;
  deps?: RegisterOptions["deps"];
  value?: undefined;
  onValueChange?: (value: string) => void;
};

type ControlledProps = BaseProps & {
  name?: string;
  deps?: undefined;
  value: string;
  onValueChange: (value: string) => void;
};

type Props = FormProps | ControlledProps;

function UIComponent({
  className,
  invalid,
  onValueChange,
  ...props
}: Omit<ControlledProps, "deps"> & { invalid?: boolean }) {
  return (
    <input
      {...props}
      type="time"
      aria-invalid={invalid || props["aria-invalid"] || undefined}
      className={cn(
        "w-36 rounded-md border border-border bg-white px-3 py-1 font-medium shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        invalid
          ? "border-error ring-error/20"
          : "focus-visible:border-primary ring-primary/20",
        className,
      )}
      onChange={(e) => onValueChange(e.target.value)}
    />
  );
}

function FormWrapper({
  name,
  deps,
  ref,
  onBlur,
  onValueChange,
  ...props
}: FormProps) {
  return (
    <Controller
      name={name}
      rules={{ deps }}
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
          invalid={!!fieldState.error}
        />
      )}
    />
  );
}

export default function TimeInput(props: Props) {
  if (props.value !== undefined) {
    const { deps: _deps, ...rest } = props;
    return <UIComponent {...rest} />;
  }
  return <FormWrapper {...props} />;
}
