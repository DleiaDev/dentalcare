import { Switch as SwitchUI } from "@/components/ui/switch";
import { Checkbox as CheckboxUI } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import { forwardRef, InputHTMLAttributes } from "react";

type Props = {
  name?: string;
  checked?: boolean;
  label: string;
  value?: any;
  className?: string;
  type?: "checkbox" | "switch";
  onCheckedChange?: (checked: boolean) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const UIComponent = forwardRef<
  HTMLLabelElement,
  Pick<Props, "type" | "label" | "className" | "checked" | "onCheckedChange">
>(({ type, label, className, checked, onCheckedChange, ...props }, ref) => {
  return (
    <label
      ref={ref}
      className={cn(
        "flex items-center gap-3 group cursor-pointer group-has-[:disabled]:cursor-not-allowed group-has=[:disabled]:opacity-50",
        className,
      )}
    >
      {type === "checkbox" ? (
        <CheckboxUI
          {...props}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
      ) : type === "switch" ? (
        <SwitchUI
          {...props}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
      ) : null}
      <div className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </div>
    </label>
  );
});
UIComponent.displayName = "UIComponent";

const FormInput = forwardRef<HTMLLabelElement, Props & { name: string }>(
  ({ name, value, ...props }, ref) => {
    const { control } = useFormContext();

    const handleCheckedChange = (
      checked: boolean,
      field: ControllerRenderProps<FieldValues, string>,
    ) => {
      if (checked === true && value !== undefined)
        field.onChange([...field.value, value]);
      else if (checked === false && value !== undefined)
        field.onChange(
          field.value.filter((val: Props["value"]) => val !== value),
        );
      else if (value === undefined) field.onChange(checked);
    };

    const isChecked = (fieldValue: any[] | boolean) => {
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
          <UIComponent
            {...props}
            ref={ref}
            checked={isChecked(field.value)}
            onCheckedChange={(checked) => handleCheckedChange(checked, field)}
          />
        )}
      />
    );
  },
);
FormInput.displayName = "FormInput";

const BooleanInput = forwardRef<HTMLLabelElement, Props>((props, ref) => {
  props = { ...props, type: props.type || "checkbox" };
  return props.name ? (
    <FormInput {...props} name={props.name} ref={ref} />
  ) : (
    <UIComponent {...props} ref={ref} />
  );
});
BooleanInput.displayName = "BooleanInput";

export default BooleanInput;
