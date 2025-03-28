import { ReactNode, useMemo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
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

type Props = {
  name?: string;
  label?: string;
  value?: Option["value"];
  options: Option[];
  textClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  allowCreate?: boolean;
  isFetching?: boolean;
  fetchingFailed?: boolean;
  onValueChange?: (value: Option["value"]) => void;
};

function RadioSkeleton() {
  return (
    <div className="flex gap-3 flex-wrap animate-in fade-in duration-500">
      <Skeleton className="h-12 w-60" />
      <Skeleton className="h-12 w-60" />
      <Skeleton className="h-12 w-60" />
    </div>
  );
}

function RadioLabel({
  option,
  errorMessage,
  value,
  className,
  children,
}: {
  value: Props["value"];
  option: Option;
  errorMessage?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={option.label}
      className={cn(
        "h-12 flex items-center gap-3 border border-border rounded-lg px-3 min-w-40 flex-1 cursor-pointer transition-colors hover:border-primary",
        errorMessage && "border-error",
        value === option.value && "border-primary",
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
      className="w-5 h-5 rounded-full border border-border"
      value={option.value}
      id={option.label}
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
  onValueChange,
}: {
  labelClassName: Props["labelClassName"];
  value: Exclude<Props["value"], undefined>;
  errorMessage?: string;
  onValueChange: (value: string) => void;
}) {
  const [newOptionText, setNewOptionText] = useState("");
  const [isCreatingNewOption, setIsCreatingNewOption] = useState(false);

  const newOption = useMemo(
    () => ({
      value: newOptionText,
      label: newOptionText,
    }),
    [newOptionText],
  );

  const handleAddNewClick = () => {
    setIsCreatingNewOption(true);
    onValueChange(newOptionText);
  };

  const handleChange = (newText: string) => {
    setNewOptionText(newText);
    if (value === newOptionText) onValueChange(newText);
  };

  return isCreatingNewOption ? (
    <RadioLabel
      value={value}
      option={newOption}
      errorMessage={errorMessage}
      className={cn(
        labelClassName,
        errorMessage && value === newOptionText && "!border-error",
      )}
    >
      <RadioIndicator option={newOption} />
      <TextInput
        value={newOptionText}
        onValueChange={handleChange}
        className="h-full p-0 border-none shadow-none focus-visible:ring-0"
        containerClassName="mb-0 h-full"
        autoFocus
      />
    </RadioLabel>
  ) : (
    <Button
      intent="outlined"
      className="[&:not(:only-child)]:flex-1 h-12 min-w-40 rounded-lg justify-start"
      onClick={handleAddNewClick}
    >
      <PlusIcon className="mr-2 h-5 w-5" />
      Add new
    </Button>
  );
}

function UIComponent({
  value,
  name,
  label,
  options,
  errorMessage,
  textClassName,
  labelClassName,
  containerClassName,
  allowCreate,
  isFetching,
  fetchingFailed,
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
      {isFetching ? (
        <RadioSkeleton />
      ) : fetchingFailed ? (
        <div className="text-error text-sm font-semibold bg-input-invalid p-4 rounded-xl animate-in fade-in duration-500">
          An error occurred
        </div>
      ) : (
        <RadioGroupPrimitive.Root
          aria-label={label}
          className={cn(
            "flex gap-3 flex-wrap",
            isFetching === false && "animate-in fade-in duration-500",
          )}
          value={value}
          onBlur={onBlur}
          onValueChange={onValueChange}
        >
          {options.map((option) => (
            <RadioLabel
              key={option.value}
              value={value}
              option={option}
              errorMessage={value === undefined ? errorMessage : undefined}
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
              onValueChange={onValueChange}
            />
          )}
        </RadioGroupPrimitive.Root>
      )}
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
  const errorMessage = errors[name]?.message;
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
