import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import get from "lodash.get";
import {
  ButtonHTMLAttributes,
  ComponentType,
  forwardRef,
  ReactNode,
  useState,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
import Button from "../Button";
import { Badge } from "../ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import Label from "./Label";
import Spinner from "@/icons/Spinner";
import ErrorMessage from "./ErrorMessage";

type Option = {
  value: string;
  label: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  description?: string;
  disabled?: boolean;
  disabledReason?: string;
};

type Group = {
  label: string;
  options: Option[];
};

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  name?: string;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  options?: Option[];
  groups?: Group[];
  label?: string;
  modal?: boolean;
  triggerClassName?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  isFetching?: boolean;
  fetchingFailed?: boolean;
  onFirstOpen?: () => void;
  // selectedValueFormat?: (selectedOption: O) => ReactNode;
}

function getOptionByValue(value: string, options?: Option[], groups?: Group[]) {
  if (options) {
    return options.find((option) => option.value === value);
  } else if (groups) {
    for (const group of groups) {
      const option = group.options.find((option) => option.value === value);
      if (option) return option;
    }
  }
}

function Options({
  value,
  options,
  onSelect,
}: {
  value: string[];
  options: Option[];
  onSelect: (v: string) => void;
}) {
  return (
    <>
      {options.map((option) => {
        const IconComponent = option?.icon;
        const isChecked = value.includes(option.value);
        return (
          <CommandItem
            key={option.value}
            onSelect={() => onSelect(option.value)}
            className="cursor-pointer justify-between"
          >
            <div className="flex items-center gap-2">
              {IconComponent && (
                <IconComponent className="h-5 w-5 text-gray-700" />
              )}
              {option.label}
            </div>
            <Checkbox checked={isChecked} />
          </CommandItem>
        );
      })}
    </>
  );
}

type UIComponentProps = Props & {
  value: Option["value"][];
  errorMessage?: string;
  onValueChange: Exclude<Props["onValueChange"], undefined>;
};

const UIComponent = forwardRef<HTMLButtonElement, UIComponentProps>(
  (
    {
      name,
      value,
      errorMessage,
      label,
      modal,
      placeholder,
      groups,
      options,
      className,
      containerClassName,
      isFetching,
      fetchingFailed,
      onValueChange,
      onFirstOpen,
      ...props
      // selectedValueFormat,
    },
    ref,
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [firstPopoverOpen, setIsFirstPopoverOpen] = useState(false);

    const handleTogglePopover = () => {
      setIsFirstPopoverOpen(true);
      setIsPopoverOpen((prev) => !prev);
      if (!firstPopoverOpen && onFirstOpen) onFirstOpen();
    };

    const handleOptionSelect = (optValue: string) => {
      const newValue = value.includes(optValue)
        ? value.filter((v) => v !== optValue)
        : [...value, optValue];
      onValueChange(newValue);
    };

    return (
      <div className={cn("mb-7", containerClassName)}>
        {label && <Label htmlFor={name}>{label}</Label>}
        <Popover
          open={isPopoverOpen}
          onOpenChange={setIsPopoverOpen}
          modal={modal}
        >
          <PopoverTrigger asChild>
            <Button
              {...props}
              intent="text"
              color="black"
              ref={ref}
              onClick={handleTogglePopover}
              className={cn(
                "flex flex-wrap justify-start gap-2 min-h-12 w-full rounded-md border border-border bg-transparent px-3 py-2 font-medium shadow-sm transition-colors select-none max-w-full",
                errorMessage
                  ? "border-error ring-error/20"
                  : fetchingFailed
                    ? "border-error bg-input-invalid"
                    : "",
                className,
              )}
              disabled={fetchingFailed}
            >
              {isFetching ? (
                <div className="text-ellipsis text-muted-foreground">
                  Loading...
                </div>
              ) : fetchingFailed ? (
                <div className="text-ellipsis">
                  An error occurred during loading
                </div>
              ) : value.length === 0 && placeholder ? (
                <span
                  className={cn(
                    "text-muted-foreground",
                    errorMessage && "text-error/70",
                  )}
                >
                  {placeholder}
                </span>
              ) : (
                value.map((v) => {
                  const option = getOptionByValue(v, options, groups);
                  const IconComponent = option?.icon;
                  return (
                    <Badge key={v} color="accent" className="text-base">
                      {IconComponent && (
                        <IconComponent className="h-5 w-5 mr-2 text-gray-700" />
                      )}
                      {option?.label}
                    </Badge>
                  );
                })
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 relative" align="start">
            {isFetching ? (
              <div className="h-48 flex items-center justify-center">
                <Spinner className="text-primary w-10 h-10" />
              </div>
            ) : (
              <Command className="animate-in fade-in duration-300">
                <CommandInput placeholder="Search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  {options ? (
                    <Options
                      value={value}
                      options={options}
                      onSelect={handleOptionSelect}
                    />
                  ) : groups ? (
                    groups.map((group) => (
                      <CommandGroup key={group.label}>
                        <Options
                          value={value}
                          options={group.options}
                          onSelect={handleOptionSelect}
                        />
                      </CommandGroup>
                    ))
                  ) : null}
                  <CommandGroup></CommandGroup>
                </CommandList>
              </Command>
            )}
          </PopoverContent>
        </Popover>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
    );
  },
);
UIComponent.displayName = "UIComponent";

const FormWrapper = forwardRef<HTMLButtonElement, Props & { name: string }>(
  ({ name, onValueChange, ...props }, ref) => {
    const {
      control,
      formState: { errors },
    } = useFormContext();

    const errorMessage = get(errors, name)?.message;

    const handleValueChange = (
      value: Option["value"][],
      onFieldChange: (value: Option["value"][]) => void,
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
            ref={ref}
            name={name}
            value={field.value}
            onValueChange={(value) => handleValueChange(value, field.onChange)}
            errorMessage={
              typeof errorMessage === "string" ? errorMessage : undefined
            }
          />
        )}
      />
    );
  },
);
FormWrapper.displayName = "FormWrapper";

const MultiSelect = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { name, value, onValueChange } = props;
  if (name !== undefined && value === undefined) {
    return <FormWrapper {...props} name={name} onValueChange={onValueChange} />;
  } else if (
    name === undefined &&
    value !== undefined &&
    onValueChange !== undefined
  ) {
    return (
      <UIComponent
        {...props}
        ref={ref}
        value={value}
        onValueChange={onValueChange}
      />
    );
  } else {
    throw new Error(
      "Supply either a 'name' or ('value' and 'onValueChange') props to <MultiSelect />",
    );
  }
});
MultiSelect.displayName = "MultiSelect";

export default MultiSelect;
