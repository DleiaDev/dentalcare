import { cn } from "@/lib/utils";
import Label from "./Label";
import { Toggle } from "../ui/toggle";
import { Controller, useFormContext } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";

type Option = {
  value: string;
  label: string;
};

type Value = Option["value"][];

type Props = {
  name?: string;
  value?: Value;
  label?: string;
  options: Option[];
  min?: number;
  containerClassName?: string;
  onPressedChange?: (value: Value) => void;
};

function UIComponent({
  options,
  name,
  value,
  label,
  min,
  containerClassName,
  errorMessage,
  onPressedChange,
}: Props & {
  value: Exclude<Props["value"], undefined>;
  errorMessage?: string;
  onPressedChange: Exclude<Props["onPressedChange"], undefined>;
}) {
  const handlePressedChange = (option: Option) => {
    const newValue = [...value];
    const index = value.findIndex((v) => v === option.value);
    if (index === -1) newValue.push(option.value);
    else if (min && value.length <= min) return;
    else newValue.splice(index, 1);
    onPressedChange(newValue);
  };

  const isPressed = (vToCompare: Option["value"]) => {
    return !!value.find((v) => v === vToCompare);
  };

  return (
    <div className={cn("mb-7", containerClassName)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <div className="flex gap-2">
        {options.map((option) => (
          <Toggle
            key={option.value}
            intent="outline"
            pressed={isPressed(option.value)}
            onPressedChange={() => handlePressedChange(option)}
          >
            {option.label}
          </Toggle>
        ))}
      </div>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}

function FormWrapper({
  name,
  onPressedChange,
  ...props
}: Props & { name: string }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[name]?.message;
  const handlePressedChange = (
    value: Value,
    onFieldChange: Exclude<Props["onPressedChange"], undefined>,
  ) => {
    onFieldChange(value);
    if (onPressedChange) onPressedChange(value);
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
          onPressedChange={(value) =>
            handlePressedChange(value, field.onChange)
          }
          errorMessage={
            typeof errorMessage === "string" ? errorMessage : undefined
          }
        />
      )}
    />
  );
}

export default function ToggleInput({
  name,
  value,
  onPressedChange,
  ...props
}: Props) {
  if (name !== undefined && value === undefined)
    return (
      <FormWrapper {...props} name={name} onPressedChange={onPressedChange} />
    );
  if (
    name === undefined &&
    value !== undefined &&
    onPressedChange !== undefined
  )
    return (
      <UIComponent {...props} value={value} onPressedChange={onPressedChange} />
    );
}
