import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  type ComponentProps,
  type ComponentType,
  type ReactNode,
  useId,
  useRef,
  useState,
} from "react";
import { Controller } from "react-hook-form";
import Button from "../Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import { cn, mergeRefs } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import Label from "./Label";
import Spinner from "@/icons/Spinner";
import ErrorMessage from "./ErrorMessage";
import { PencilIcon, PlusIcon } from "lucide-react";
import NextLink from "next/link";

export type Option = {
  value: string;
  label: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  description?: string | null;
  disabled?: boolean;
  disabledReason?: string;
};

type Group = {
  label: string;
  options: Option[];
};

// `null` means nothing is selected.
type Value = Option["value"] | null;

type BaseProps = Omit<
  ComponentProps<"button">,
  "name" | "value" | "defaultValue" | "onChange" | "children"
> & {
  label?: string;
  labelDescription?: string;
  modal?: boolean;
  placeholder?: string;
  containerClassName?: string;
  isFetching?: boolean;
  fetchingFailed?: boolean;
  onFirstOpen?: () => void;
  editLinkHref?: string;
  editLinkItemNamePlural?: string;
  // selectedValueFormat?: (selectedOption: O) => ReactNode;
};

// Creating options isn't supported together with groups.
type SourceProps =
  | {
      options: Option[];
      groups?: undefined;
      createButtonItemName?: string;
      handleCreateClick?: (query: string) => void;
    }
  | {
      options?: undefined;
      groups: Group[];
      createButtonItemName?: undefined;
      handleCreateClick?: undefined;
    };

type FormProps = BaseProps &
  SourceProps & {
    name: string;
    value?: undefined;
    onValueChange?: (value: Value) => void;
  };

type ControlledProps = BaseProps &
  SourceProps & {
    name?: string;
    value: Value;
    onValueChange: (value: Value) => void;
  };

type Props = FormProps | ControlledProps;

function getOptionByValue(
  value: Option["value"],
  options?: Option[],
  groups?: Group[],
) {
  if (options) {
    return options.find((option) => option.value === value);
  } else if (groups) {
    for (const group of groups) {
      const option = group.options.find((option) => option.value === value);
      if (option) return option;
    }
  }
}

function SelectedValue({
  value,
  options,
  groups,
}: {
  value: Value;
  options?: Option[];
  groups?: Group[];
}) {
  if (value === null) return;
  const option = getOptionByValue(value, options, groups);
  if (!option) return;
  const IconComponent = option.icon;
  return (
    <div className="flex items-center gap-2">
      {IconComponent && (
        <IconComponent className="min-h-5 min-w-5 text-gray-700" />
      )}
      {option.label}
    </div>
  );
}

function Options({
  value,
  options,
  onSelect,
}: {
  value: Value;
  options: Option[];
  onSelect: (v: Option["value"]) => void;
}) {
  return (
    <>
      {options.map((option) => {
        const IconComponent = option.icon;
        const isChecked = value === option.value;
        return (
          <CommandItem
            key={option.value}
            disabled={option.disabled}
            onSelect={() => onSelect(option.value)}
            className="cursor-pointer justify-between"
          >
            <div className="flex items-center gap-2">
              {IconComponent && (
                <IconComponent className="min-h-5 min-w-5 text-gray-700" />
              )}
              <div>
                {option.label}
                {option.description && (
                  <div className="text-sm text-gray-700">
                    {option.description}
                  </div>
                )}
                {option.disabled && option.disabledReason && (
                  <div className="text-sm text-gray-600">
                    {option.disabledReason}
                  </div>
                )}
              </div>
            </div>
            <Checkbox checked={isChecked} tabIndex={-1} aria-hidden />
          </CommandItem>
        );
      })}
    </>
  );
}

type UIComponentProps = ControlledProps & {
  errorMessage?: string;
  // Called when the popover closes, so form mode can mark the field touched
  // even when focus doesn't return to the trigger (e.g. click outside).
  onClose?: () => void;
};

function UIComponent({
  id: idProp,
  name: _name,
  value,
  errorMessage,
  label,
  labelDescription,
  modal,
  placeholder,
  groups,
  options,
  className,
  containerClassName,
  isFetching,
  fetchingFailed,
  disabled,
  onBlur,
  onValueChange,
  onFirstOpen,
  onClose,
  createButtonItemName,
  editLinkHref,
  editLinkItemNamePlural,
  handleCreateClick,
  ...props
  // selectedValueFormat,
}: UIComponentProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const hasOpenedRef = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newOptions, setNewOptions] = useState<Option[]>([]);

  const allOptions = options ? [...options, ...newOptions] : undefined;

  const handleOpenChange = (open: boolean) => {
    setIsPopoverOpen(open);
    if (open && !hasOpenedRef.current) {
      hasOpenedRef.current = true;
      onFirstOpen?.();
    }
    if (!open) {
      setSearchQuery("");
      onClose?.();
    }
  };

  const handleCreateOption = () => {
    if (handleCreateClick) {
      handleCreateClick(searchQuery);
      handleOpenChange(false);
      return;
    }
    const alreadyExists = allOptions?.some(
      (option) => option.value === searchQuery,
    );
    if (alreadyExists) return;
    const newOption = {
      value: searchQuery,
      label: searchQuery,
      icon: options?.[0]?.icon,
    };
    setNewOptions([...newOptions, newOption]);
    onValueChange(newOption.value);
    handleOpenChange(false);
  };

  const handleOptionSelect = (optValue: Option["value"]) => {
    onValueChange(optValue === value ? null : optValue);
    handleOpenChange(false);
  };

  return (
    <div className={cn("mb-7", containerClassName)}>
      {label && (
        <Label htmlFor={id} description={labelDescription}>
          {label}
        </Label>
      )}
      <Popover
        open={isPopoverOpen}
        onOpenChange={handleOpenChange}
        modal={modal}
      >
        <PopoverTrigger asChild>
          <Button
            {...props}
            id={id}
            variant="text"
            color="black"
            aria-invalid={errorMessage ? true : undefined}
            aria-describedby={
              cn(errorMessage && errorId, props["aria-describedby"]) ||
              undefined
            }
            className={cn(
              "flex flex-wrap justify-start gap-2 min-h-12 w-full rounded-md border border-border bg-transparent px-3 py-2 font-medium shadow-xs transition-colors select-none max-w-full",
              errorMessage
                ? "border-error ring-error/20"
                : fetchingFailed
                  ? "border-error bg-input-invalid"
                  : "",
              className,
            )}
            disabled={disabled || fetchingFailed}
            onBlur={(e) => {
              // Focus moving into the open popover isn't leaving the field.
              if (!isPopoverOpen) onBlur?.(e);
            }}
          >
            {isFetching ? (
              <div className="truncate text-muted-foreground">Loading...</div>
            ) : fetchingFailed ? (
              <div className="truncate">An error occurred during loading</div>
            ) : value === null && placeholder ? (
              <span
                className={cn(
                  "text-muted-foreground",
                  errorMessage && "text-error/70",
                )}
              >
                {placeholder}
              </span>
            ) : (
              <SelectedValue
                value={value}
                options={allOptions}
                groups={groups}
              />
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
              <CommandInput
                autoFocus
                placeholder="Search..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty className={cn(createButtonItemName && "p-0")}>
                  {!createButtonItemName ? (
                    <p>No results found</p>
                  ) : searchQuery ? (
                    <Button
                      variant="ghost"
                      color="black"
                      className="w-full justify-start p-3 h-auto rounded-sm"
                      onClick={handleCreateOption}
                    >
                      <PlusIcon className="mr-2" />
                      Create new {createButtonItemName} &quot;{searchQuery}
                      &quot;
                    </Button>
                  ) : null}
                </CommandEmpty>
                {allOptions ? (
                  <Options
                    value={value}
                    options={allOptions}
                    onSelect={handleOptionSelect}
                  />
                ) : groups ? (
                  groups.map((group) => (
                    <CommandGroup key={group.label} heading={group.label}>
                      <Options
                        value={value}
                        options={group.options}
                        onSelect={handleOptionSelect}
                      />
                    </CommandGroup>
                  ))
                ) : null}
              </CommandList>
              {editLinkItemNamePlural && editLinkHref && (
                <>
                  <CommandSeparator />
                  <NextLink
                    href={editLinkHref}
                    className="text-gray-700 p-3 flex items-center bg-gray-200 hover:bg-gray-300 hover:text-gray-800"
                  >
                    <PencilIcon className="mr-2 min-h-5 min-w-5" />
                    Edit {editLinkItemNamePlural}
                  </NextLink>
                </>
              )}
            </Command>
          )}
        </PopoverContent>
      </Popover>
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
          ref={mergeRefs(field.ref, ref)}
          name={name}
          value={field.value ?? null}
          disabled={field.disabled ?? props.disabled}
          onBlur={(e) => {
            field.onBlur();
            onBlur?.(e);
          }}
          onClose={field.onBlur}
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

export default function SingleSelect(props: Props) {
  if (props.value !== undefined) return <UIComponent {...props} />;
  return <FormWrapper {...props} />;
}
