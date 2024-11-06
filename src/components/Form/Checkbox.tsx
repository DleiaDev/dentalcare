import { Checkbox as CheckboxUI } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";

type Value = string | number;

type Props = {
  name: string;
  label: string;
  value?: Value;
  className?: string;
  onChange?: (checked: boolean | string, name: string) => void;
};

export default function Checkbox({
  name,
  label,
  value,
  className,
  onChange,
}: Props) {
  const { control } = useFormContext();

  const handleCheckedChange = (
    checked: boolean | string,
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    if (checked === true && value !== undefined)
      field.onChange([...field.value, value]);
    else if (checked === false && value !== undefined)
      field.onChange(
        field.value.filter((val: Props["value"]) => val !== value),
      );
    else if (value === undefined) field.onChange(checked);
    if (onChange) onChange(checked, name);
  };

  const isChecked = (fieldValue: Value[] | boolean) => {
    if (value !== undefined && Array.isArray(fieldValue))
      return fieldValue.includes(value);
    if (value === undefined && typeof fieldValue === "boolean")
      return fieldValue;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <label
          className={cn(
            "flex items-center gap-3 group cursor-pointer group-has-[:disabled]:cursor-not-allowed",
            className,
          )}
        >
          <CheckboxUI
            checked={isChecked(field.value)}
            onCheckedChange={(checked) => handleCheckedChange(checked, field)}
          />
          <div className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {label}
          </div>
        </label>
      )}
    />
  );
}
