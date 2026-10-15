import { type ComponentProps, type FocusEvent, type Ref, useId } from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import Label from "./Label";
import { Toggle } from "../ui/toggle";
import ErrorMessage from "./ErrorMessage";

type Option = {
  value: string;
  label: string;
};

type Value = Option["value"][];

type BaseProps = Omit<
  ComponentProps<"div">,
  "children" | "defaultValue" | "onChange" | "onBlur"
> & {
  label?: string;
  labelDescription?: string;
  options: Option[];
  min?: number;
  disabled?: boolean;
  containerClassName?: string;
  /** Called when focus leaves the group, not when moving between toggles. */
  onBlur?: (e: FocusEvent<HTMLDivElement>) => void;
};

type FormProps = BaseProps & {
  name: string;
  value?: undefined;
  onValueChange?: (value: Value) => void;
};

type ControlledProps = BaseProps & {
  name?: string;
  value: Value;
  onValueChange: (value: Value) => void;
};

type Props = FormProps | ControlledProps;

function UIComponent({
  id: idProp,
  name: _name,
  className,
  label,
  labelDescription,
  options,
  min,
  disabled,
  value,
  containerClassName,
  errorMessage,
  toggleRef,
  onBlur,
  onValueChange,
  ...props
}: ControlledProps & {
  errorMessage?: string;
  /** Attached to the first toggle so `setFocus(name)` can focus the group. */
  toggleRef?: Ref<HTMLButtonElement>;
}) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;

  const handlePressedChange = (
    optionValue: Option["value"],
    pressed: boolean,
  ) => {
    if (!pressed && min !== undefined && value.length <= min) return;
    // Rebuild from `options` so the value keeps option order, not click order.
    const newValue = options
      .map((option) => option.value)
      .filter((v) => (v === optionValue ? pressed : value.includes(v)));
    onValueChange(newValue);
  };

  return (
    <div className={cn("mb-7", containerClassName)}>
      {label && (
        <Label id={labelId} description={labelDescription}>
          {label}
        </Label>
      )}
      <div
        {...props}
        id={id}
        role="group"
        aria-labelledby={
          cn(label && labelId, props["aria-labelledby"]) || undefined
        }
        aria-describedby={
          cn(errorMessage && errorId, props["aria-describedby"]) || undefined
        }
        className={cn("flex gap-2", className)}
        onBlur={(e) => {
          if (e.currentTarget.contains(e.relatedTarget)) return;
          onBlur?.(e);
        }}
      >
        {options.map((option, index) => (
          <Toggle
            key={option.value}
            ref={index === 0 ? toggleRef : undefined}
            variant="outline"
            disabled={disabled}
            pressed={value.includes(option.value)}
            onPressedChange={(pressed) =>
              handlePressedChange(option.value, pressed)
            }
            className={cn(errorMessage && "border-error")}
          >
            {option.label}
          </Toggle>
        ))}
      </div>
      {errorMessage && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
    </div>
  );
}

function FormWrapper({ name, onBlur, onValueChange, ...props }: FormProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <UIComponent
          {...props}
          toggleRef={field.ref}
          name={name}
          value={field.value ?? []}
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

export default function ToggleInput(props: Props) {
  if (props.value !== undefined) return <UIComponent {...props} />;
  return <FormWrapper {...props} />;
}
