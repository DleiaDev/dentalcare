import { type ComponentProps, type ReactNode, useId, useState } from "react";
import { Controller } from "react-hook-form";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn, mergeRefs } from "@/lib/utils";
import Button from "@/components/Button";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";
import { Skeleton } from "../ui/skeleton";
import { PlusIcon } from "lucide-react";
import TextInput from "./TextInput";

type Option = {
  label: string;
  value: string;
};

// `null` means nothing is selected.
type Value = Option["value"] | null;

type BaseProps = Omit<
  ComponentProps<typeof RadioGroupPrimitive.Root>,
  "name" | "value" | "defaultValue" | "onValueChange" | "children" | "asChild"
> & {
  label?: string;
  options: Option[];
  textClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  allowCreate?: boolean;
  isFetching?: boolean;
  fetchingFailed?: boolean;
};

type FormProps = BaseProps & {
  name: string;
  value?: undefined;
  onValueChange?: (value: Option["value"]) => void;
};

type ControlledProps = BaseProps & {
  name?: string;
  value: Value;
  onValueChange: (value: Option["value"]) => void;
};

type Props = FormProps | ControlledProps;

function RadioSkeleton() {
  return (
    <div className="flex gap-3 flex-wrap animate-in fade-in duration-500">
      <Skeleton className="h-12 w-60" />
      <Skeleton className="h-12 w-60" />
      <Skeleton className="h-12 w-60" />
    </div>
  );
}

// Wraps the radio item, so the label is linked to it without an `id`.
function RadioLabel({
  checked,
  invalid,
  className,
  children,
}: {
  checked: boolean;
  invalid: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "h-12 flex items-center gap-3 border border-border rounded-lg px-3 min-w-40 flex-1 cursor-pointer transition-colors hover:border-primary has-disabled:cursor-not-allowed has-disabled:opacity-50",
        checked && "border-primary",
        invalid && "border-error",
        className,
      )}
    >
      {children}
    </label>
  );
}

function RadioIndicator({ option }: { option: Option }) {
  return (
    <RadioGroupPrimitive.Item
      className="w-5 h-5 shrink-0 rounded-full border border-border"
      value={option.value}
    >
      <RadioGroupPrimitive.Indicator className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
        <span className="w-1/2 h-1/2 rounded-full bg-white"></span>
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

function NewOption({
  value,
  labelClassName,
  errorMessage,
  disabled,
  onValueChange,
}: {
  value: Value;
  labelClassName?: string;
  errorMessage?: string;
  disabled?: boolean;
  onValueChange: (value: Option["value"]) => void;
}) {
  const [newOptionText, setNewOptionText] = useState("");
  const [isCreatingNewOption, setIsCreatingNewOption] = useState(false);

  const newOption = { value: newOptionText, label: newOptionText };
  const checked = value === newOptionText;

  const handleAddNewClick = () => {
    setIsCreatingNewOption(true);
    onValueChange(newOptionText);
  };

  // Typing a new option selects it, even if another option was selected.
  const handleChange = (newText: string) => {
    setNewOptionText(newText);
    onValueChange(newText);
  };

  return isCreatingNewOption ? (
    <RadioLabel
      checked={checked}
      invalid={!!errorMessage && (checked || value === null)}
      className={labelClassName}
    >
      <RadioIndicator option={newOption} />
      <TextInput
        aria-label="New option"
        value={newOptionText}
        disabled={disabled}
        onValueChange={handleChange}
        className="h-full p-0 border-none shadow-none focus-visible:ring-0"
        containerClassName="mb-0 h-full"
        autoFocus
      />
    </RadioLabel>
  ) : (
    <Button
      variant="outline"
      className="not-only:flex-1 h-12 min-w-40 rounded-lg justify-start"
      disabled={disabled}
      onClick={handleAddNewClick}
    >
      <PlusIcon className="mr-2 h-5 w-5" />
      Add new
    </Button>
  );
}

function UIComponent({
  id: idProp,
  value,
  label,
  options,
  errorMessage,
  className,
  textClassName,
  labelClassName,
  containerClassName,
  allowCreate,
  isFetching,
  fetchingFailed,
  disabled,
  onBlur,
  onValueChange,
  ...props
}: ControlledProps & { errorMessage?: string }) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const labelId = `${id}-label`;
  const errorId = `${id}-error`;

  return (
    <div className={cn("mb-7", containerClassName)}>
      {label && <Label id={labelId}>{label}</Label>}
      {isFetching ? (
        <RadioSkeleton />
      ) : fetchingFailed ? (
        <div className="text-error text-sm font-semibold bg-input-invalid p-4 rounded-xl animate-in fade-in duration-500">
          An error occurred
        </div>
      ) : (
        <RadioGroupPrimitive.Root
          {...props}
          id={id}
          aria-labelledby={
            cn(label && labelId, props["aria-labelledby"]) || undefined
          }
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={
            cn(errorMessage && errorId, props["aria-describedby"]) || undefined
          }
          className={cn(
            "flex gap-3 flex-wrap",
            isFetching === false && "animate-in fade-in duration-500",
            className,
          )}
          // Radix treats `undefined` as uncontrolled, so "" clears the selection.
          value={value ?? ""}
          disabled={disabled}
          onBlur={(e) => {
            // Moving focus between items isn't leaving the group.
            if (!e.currentTarget.contains(e.relatedTarget)) onBlur?.(e);
          }}
          onValueChange={onValueChange}
        >
          {options.map((option) => (
            <RadioLabel
              key={option.value}
              checked={value === option.value}
              invalid={!!errorMessage && value === null}
              className={labelClassName}
            >
              <RadioIndicator option={option} />
              <span className={cn("font-medium", textClassName)}>
                {option.label}
              </span>
            </RadioLabel>
          ))}
          {allowCreate && (
            <NewOption
              labelClassName={labelClassName}
              value={value}
              errorMessage={errorMessage}
              disabled={disabled}
              onValueChange={onValueChange}
            />
          )}
        </RadioGroupPrimitive.Root>
      )}
      {errorMessage && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
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
          // Focusing the Radix root moves focus to the checked (or first) item.
          ref={mergeRefs(field.ref, ref)}
          name={name}
          value={field.value ?? null}
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

export default function RadioGroup(props: Props) {
  if (props.value !== undefined) return <UIComponent {...props} />;
  return <FormWrapper {...props} />;
}
