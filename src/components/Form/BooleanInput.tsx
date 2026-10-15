import { type ComponentProps, useId } from "react";
import { Controller } from "react-hook-form";
import { Switch as SwitchUI } from "@/components/ui/switch";
import { Checkbox as CheckboxUI } from "@/components/ui/checkbox";
import { cn, mergeRefs } from "@/lib/utils";
import ErrorMessage from "./ErrorMessage";

type BaseProps = Omit<
  ComponentProps<typeof SwitchUI>,
  | "name"
  | "value"
  | "checked"
  | "defaultChecked"
  | "onCheckedChange"
  | "type"
  | "asChild"
  | "children"
> & {
  label: string;
  type?: "checkbox" | "switch";
  containerClassName?: string;
};

type FormProps = BaseProps & {
  name: string;
  // Set: the field is an array and this checkbox toggles `value` in it.
  // Unset: the field is a boolean.
  value?: string | number;
  checked?: undefined;
  onCheckedChange?: (checked: boolean) => void;
};

type ControlledProps = BaseProps & {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

type Props = FormProps | ControlledProps;

function UIComponent({
  type = "checkbox",
  label,
  className,
  containerClassName,
  errorMessage,
  invalid,
  onCheckedChange,
  ...props
}: ControlledProps & { errorMessage?: string; invalid?: boolean }) {
  const generatedId = useId();
  const errorId = `${props.id ?? generatedId}-error`;
  const Control = type === "switch" ? SwitchUI : CheckboxUI;

  return (
    <div className={containerClassName}>
      {/* Wrapping the control links the label to it without an `id`. */}
      <label
        className={cn(
          "flex items-center gap-3 cursor-pointer has-disabled:cursor-not-allowed has-disabled:opacity-50",
          className,
        )}
      >
        <Control
          {...props}
          aria-invalid={invalid || errorMessage ? true : undefined}
          aria-describedby={
            cn(errorMessage && errorId, props["aria-describedby"]) || undefined
          }
          // Radix checkboxes can report "indeterminate"; this component never sets it.
          onCheckedChange={(checked) => onCheckedChange(checked === true)}
        />
        <span className="font-medium leading-none">{label}</span>
      </label>
      {errorMessage && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
    </div>
  );
}

function FormWrapper({
  name,
  value,
  ref,
  onBlur,
  onCheckedChange,
  ...props
}: FormProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => {
        const isArrayField = value !== undefined;
        const selected: unknown[] = Array.isArray(field.value)
          ? field.value
          : [];
        const checked = isArrayField
          ? selected.includes(value)
          : field.value === true;

        return (
          <UIComponent
            {...props}
            ref={mergeRefs(field.ref, ref)}
            checked={checked}
            disabled={field.disabled ?? props.disabled}
            onBlur={(e) => {
              field.onBlur();
              onBlur?.(e);
            }}
            onCheckedChange={(newChecked) => {
              if (!isArrayField) field.onChange(newChecked);
              else if (newChecked && !checked)
                field.onChange([...selected, value]);
              else if (!newChecked)
                field.onChange(selected.filter((v) => v !== value));
              onCheckedChange?.(newChecked);
            }}
            // An array field's error belongs to the whole group, so the
            // caller renders it once instead of under every checkbox.
            invalid={!!fieldState.error}
            errorMessage={isArrayField ? undefined : fieldState.error?.message}
          />
        );
      }}
    />
  );
}

export default function BooleanInput(props: Props) {
  if (props.checked !== undefined) return <UIComponent {...props} />;
  return <FormWrapper {...props} />;
}
