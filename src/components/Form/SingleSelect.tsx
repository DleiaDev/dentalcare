import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  type ButtonHTMLAttributes,
  type ComponentType,
  type ReactNode,
  type RefObject,
  useState,
} from "react";
import { Controller, useFormContext } from "react-hook-form";
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
import { cn } from "@/lib/utils";
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

type Value = Option["value"] | undefined;

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value">;

interface Props extends ButtonProps {
  name?: string;
  value?: Option["value"];
  onValueChange?: (value: Value) => void;
  ref?: RefObject<HTMLButtonElement>;
  options?: Option[];
  groups?: Group[];
  label?: string;
  labelDescription?: string;
  modal?: boolean;
  triggerClassName?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  isFetching?: boolean;
  fetchingFailed?: boolean;
  onFirstOpen?: () => void;
  editLinkHref?: string;
  editLinkItemNamePlural?: string;
  createButtonItemName?: string;
  handleCreateClick?: (query: string) => void;
  // selectedValueFormat?: (selectedOption: O) => ReactNode;
}

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
  options: Props["options"];
  groups: Props["groups"];
}) {
  if (value === undefined) return;
  const option = getOptionByValue(value, options, groups);
  if (!option) return;
  const IconComponent = option?.icon;
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
        const IconComponent = option?.icon;
        const isChecked = value === option.value;
        return (
          <CommandItem
            key={option.value}
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
              </div>
            </div>
            <Checkbox checked={isChecked} tabIndex={-1} />
          </CommandItem>
        );
      })}
    </>
  );
}

type UIComponentProps = Props & {
  value: Value;
  errorMessage?: string;
  onValueChange: (value: Value) => void;
};

function UIComponent({
  name,
  value,
  errorMessage,
  label,
  labelDescription,
  ref,
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
  createButtonItemName,
  editLinkHref,
  editLinkItemNamePlural,
  handleCreateClick,
  ...props
  // selectedValueFormat,
}: UIComponentProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [firstPopoverOpen, setIsFirstPopoverOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newOptions, setNewOptions] = useState<Option[]>([]);

  const allOptions = [...(options ?? []), ...newOptions];

  const handleTogglePopover = () => {
    setIsFirstPopoverOpen(true);
    setIsPopoverOpen((prev) => !prev);
    if (!firstPopoverOpen && onFirstOpen) onFirstOpen();
  };

  const handleCreateOption = () => {
    if (handleCreateClick) {
      handleCreateClick(searchQuery);
      setSearchQuery("");
      return;
    }
    const alreadyExists = allOptions.some(
      (option) => option.value === searchQuery,
    );
    if (alreadyExists) return;
    const newOption = {
      value: searchQuery,
      label: searchQuery,
      icon: options ? options[0]?.icon : undefined,
    };
    setSearchQuery("");
    setNewOptions([...newOptions, newOption]);
    onValueChange(newOption.value);
  };

  const handleOptionSelect = (optValue: Option["value"]) => {
    onValueChange(optValue === value ? undefined : optValue);
  };

  return (
    <div className={cn("mb-7", containerClassName)}>
      {label && (
        <Label htmlFor={name} description={labelDescription}>
          {label}
        </Label>
      )}
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
        modal={modal}
      >
        <PopoverTrigger asChild>
          <Button
            {...props}
            variant="text"
            color="black"
            ref={ref}
            onClick={handleTogglePopover}
            className={cn(
              "flex flex-wrap justify-start gap-2 min-h-12 w-full rounded-md border border-border bg-transparent px-3 py-2 font-medium shadow-xs transition-colors select-none max-w-full",
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
            ) : value === undefined && placeholder ? (
              <span
                className={cn(
                  "text-muted-foreground",
                  errorMessage && "text-error/70",
                )}
              >
                {placeholder}
              </span>
            ) : (
              <SelectedValue value={value} options={options} groups={groups} />
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
                {options ? (
                  <Options
                    value={value}
                    options={allOptions}
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
              </CommandList>
              {editLinkItemNamePlural && editLinkHref && (
                <>
                  <CommandSeparator />
                  <NextLink
                    href={editLinkHref}
                    className="text-gray-700 p-3 flex items-center bg-gray-200 hover:bg-gray-300 hover:text-800"
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

  const handleValueChange = (
    value: Value,
    onFieldChange: (value: Value) => void,
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
          onValueChange={(value) => handleValueChange(value, field.onChange)}
          errorMessage={
            typeof errorMessage === "string" ? errorMessage : undefined
          }
        />
      )}
    />
  );
}

export default function SingleSelect(props: Props) {
  if (props.groups && props.createButtonItemName)
    throw new Error(
      "Combination of 'groups' and 'createButtonItemName' props isn't yet supported",
    );
  const { name, value, onValueChange } = props;
  if (name !== undefined && value === undefined) {
    return <FormWrapper {...props} name={name} onValueChange={onValueChange} />;
  } else if (
    name === undefined &&
    value !== undefined &&
    onValueChange !== undefined
  ) {
    return (
      <UIComponent {...props} value={value} onValueChange={onValueChange} />
    );
  } else {
    throw new Error(
      "Supply either a 'name' or ('value' and 'onValueChange') props to <MultiSelect />",
    );
  }
}
