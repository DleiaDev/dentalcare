import get from "lodash.get";
import { cn } from "@/lib/utils";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Controller, useFormContext } from "react-hook-form";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name?: string;
  label?: string;
  value?: Option["value"];
  options: Option[];
  textClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  onValueChange?: (value: Option["value"]) => void;
};

export function UIComponent({
  value,
  name,
  label,
  options,
  errorMessage,
  textClassName,
  labelClassName,
  containerClassName,
  onBlur,
  onValueChange,
}: Props & {
  value: Exclude<Props["value"], undefined>;
  errorMessage?: string;
  onBlur?: () => void;
  onValueChange: Exclude<Props["onValueChange"], undefined>;
}) {
  return (
    <div className={cn("mb-7", containerClassName)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <RadioGroupPrimitive.Root
        aria-label={label}
        className="flex gap-6 flex-wrap"
        value={value}
        onBlur={onBlur}
        onValueChange={onValueChange}
      >
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={option.label}
            className={cn(
              "h-12 flex items-center gap-3 border border-border rounded-lg px-3 min-w-40 flex-1 cursor-pointer transition-colors hover:border-primary",
              errorMessage && "border-error",
              value === option.value && "border-primary",
              labelClassName,
            )}
          >
            <RadioGroupPrimitive.Item
              className="w-5 h-5 rounded-full border border-border"
              value={option.value}
              id={option.label}
            >
              <RadioGroupPrimitive.Indicator className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <span className="w-1/2 h-1/2 rounded-full bg-white"></span>
              </RadioGroupPrimitive.Indicator>
            </RadioGroupPrimitive.Item>
            <span className={cn("font-medium", textClassName)}>
              {option.label}
            </span>
          </label>
        ))}
      </RadioGroupPrimitive.Root>
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
  const handlePressedChange = (
    value: Option["value"],
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
          onBlur={field.onBlur}
          onValueChange={(value) => handlePressedChange(value, field.onChange)}
          errorMessage={
            typeof errorMessage === "string" ? errorMessage : undefined
          }
        />
      )}
    />
  );
}

export default function RadioGroup({
  name,
  value,
  onValueChange,
  ...props
}: Props) {
  if (name !== undefined && value === undefined)
    return <FormWrapper {...props} name={name} onValueChange={onValueChange} />;
  if (name === undefined && value !== undefined && onValueChange !== undefined)
    return (
      <UIComponent {...props} value={value} onValueChange={onValueChange} />
    );
}
