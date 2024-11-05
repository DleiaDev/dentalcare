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
  name: string;
  label: string;
  options: Option[];
};

export default function RadioGroup({ name, label, options }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[name]?.message;
  console.log(errorMessage);

  return (
    <div className="mb-7">
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroupPrimitive.Root
            aria-label={label}
            className="flex gap-6 flex-wrap"
            value={field.value}
            onBlur={field.onBlur}
            onValueChange={field.onChange}
          >
            {options.map((option) => (
              <label
                key={option.value}
                htmlFor={option.label}
                className={cn(
                  "h-12 flex items-center gap-3 border border-border rounded-lg px-3 min-w-40 flex-1 cursor-pointer transition-colors hover:border-primary",
                  errorMessage && "border-error",
                  field.value === option.value && "border-primary",
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
                <span className="font-medium">{option.label}</span>
              </label>
            ))}
          </RadioGroupPrimitive.Root>
        )}
      />
      {typeof errorMessage === "string" && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </div>
  );
}
