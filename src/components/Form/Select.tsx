import {
  Select as SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from "@/components/ui/select";
import Tooltip from "@/components/Tooltip";
import { cn, mergeRefs } from "@/lib/utils";
import Label from "./Label";
import { Controller } from "react-hook-form";
import {
  type ComponentProps,
  Fragment,
  type ReactNode,
  useId,
  useState,
} from "react";
import ErrorMessage from "./ErrorMessage";

export type Option<V = string | number> = {
  label: ReactNode;
  value: V;
  description?: string;
  disabled?: boolean;
  disabledReason?: string;
};

type Group<O> = {
  label: string;
  options: O[];
};

type BaseProps<O extends Option> = Omit<
  ComponentProps<typeof SelectTrigger>,
  "name" | "value" | "defaultValue" | "onChange" | "children"
> & {
  label?: string;
  placeholder?: string;
  containerClassName?: string;
  isFetching?: boolean;
  fetchingFailed?: boolean;
  selectedValueFormat?: (selectedOption: O) => ReactNode;
};

type SourceProps<O extends Option> =
  | { options: O[]; groups?: undefined }
  | { options?: undefined; groups: Group<O>[] };

type FormProps<O extends Option> = BaseProps<O> &
  SourceProps<O> & {
    name: string;
    value?: undefined;
    onValueChange?: (value: O["value"]) => void;
  };

// `null` means nothing is selected.
type ControlledProps<O extends Option> = BaseProps<O> &
  SourceProps<O> & {
    name?: string;
    value: O["value"] | null;
    onValueChange: (value: O["value"]) => void;
  };

export type SelectProps<O extends Option = Option> =
  | FormProps<O>
  | ControlledProps<O>;

// Radix Select only works with string values, so options are matched by
// their stringified value and the original (possibly numeric) value is
// passed back to the caller.
function getSelectedOption<O extends Option>(
  value: string,
  options?: O[],
  groups?: Group<O>[],
) {
  const allOptions = options ?? groups?.flatMap((group) => group.options);
  return allOptions?.find((option) => `${option.value}` === value);
}

function SelectValueFormatted<O extends Option>({
  options,
  groups,
  value,
  placeholder,
  selectedValueFormat,
}: {
  value: string;
  placeholder?: string;
  selectedValueFormat?: BaseProps<O>["selectedValueFormat"];
  options?: O[];
  groups?: Group<O>[];
}) {
  const selectedOption = getSelectedOption(value, options, groups);

  let result;
  if (selectedOption) {
    if (selectedValueFormat) result = selectedValueFormat(selectedOption);
    else
      result = (
        <div className="flex gap-2 items-center">
          {selectedOption.label}
          {selectedOption.description && (
            <div className="text-sm text-gray-700">
              ({selectedOption.description})
            </div>
          )}
        </div>
      );
  }

  return <SelectValue placeholder={placeholder}>{result}</SelectValue>;
}

function OptionComponent({ option }: { option: Option }) {
  return (
    <SelectItem value={`${option.value}`} disabled={option.disabled}>
      {option.label}
      {option.description && (
        <div className="text-sm text-gray-700">{option.description}</div>
      )}
    </SelectItem>
  );
}

function Options({ options }: { options: Option[] }) {
  return (
    <>
      {options.map((option) =>
        option.disabled && option.disabledReason ? (
          // Disabled items have `pointer-events: none`, so the tooltip needs
          // a wrapper to receive hover events.
          <Tooltip key={`${option.value}`} content={option.disabledReason}>
            <div>
              <OptionComponent option={option} />
            </div>
          </Tooltip>
        ) : (
          <OptionComponent key={`${option.value}`} option={option} />
        ),
      )}
    </>
  );
}

type UIComponentProps<O extends Option> = ControlledProps<O> & {
  errorMessage?: string;
  // Called when the dropdown closes, so form mode can mark the field touched
  // even when focus doesn't return to the trigger.
  onClose?: () => void;
};

function UIComponent<O extends Option>({
  id: idProp,
  name: _name,
  value,
  errorMessage,
  label,
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
  onClose,
  selectedValueFormat,
  ...props
}: UIComponentProps<O>) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const errorId = `${id}-error`;

  const [isOpen, setIsOpen] = useState(false);

  // Radix shows the placeholder only for "" (not "undefined" / "null").
  const stringValue = value == null ? "" : `${value}`;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) onClose?.();
  };

  const handleValueChange = (newValue: string) => {
    const selectedOption = getSelectedOption(newValue, options, groups);
    if (selectedOption) onValueChange(selectedOption.value);
  };

  return (
    <div className={cn("mb-7", containerClassName)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <SelectRoot
        value={stringValue}
        open={isOpen}
        onOpenChange={handleOpenChange}
        onValueChange={handleValueChange}
        disabled={disabled || isFetching || fetchingFailed}
      >
        <SelectTrigger
          {...props}
          id={id}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={
            cn(errorMessage && errorId, props["aria-describedby"]) ||
            undefined
          }
          className={cn(
            errorMessage
              ? "border-error ring-error/20"
              : fetchingFailed
                ? "border-error bg-input-invalid"
                : "data-[state=open]:border-primary focus:border-primary ring-primary/20",
            className,
          )}
          onBlur={(e) => {
            // Focus moving into the open dropdown isn't leaving the field.
            if (!isOpen) onBlur?.(e);
          }}
        >
          {isFetching ? (
            <div>Loading...</div>
          ) : fetchingFailed ? (
            <div>An error occurred during loading</div>
          ) : (
            <SelectValueFormatted
              options={options}
              groups={groups}
              value={stringValue}
              placeholder={placeholder}
              selectedValueFormat={selectedValueFormat}
            />
          )}
        </SelectTrigger>
        <SelectContent>
          {groups ? (
            groups.map((group, i) => (
              <Fragment key={group.label}>
                <SelectGroup>
                  <SelectLabel className="p-3 text-muted-foreground">
                    {group.label}
                  </SelectLabel>
                  <Options options={group.options} />
                </SelectGroup>
                {i < groups.length - 1 && <SelectSeparator />}
              </Fragment>
            ))
          ) : options ? (
            <Options options={options} />
          ) : null}
        </SelectContent>
      </SelectRoot>
      {errorMessage && <ErrorMessage id={errorId}>{errorMessage}</ErrorMessage>}
    </div>
  );
}

function FormWrapper<O extends Option>({
  name,
  ref,
  onBlur,
  onValueChange,
  ...props
}: FormProps<O>) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <UIComponent<O>
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

// TS doesn't narrow the union on `value` when it depends on a generic.
function isControlled<O extends Option>(
  props: SelectProps<O>,
): props is ControlledProps<O> {
  return props.value !== undefined;
}

export default function Select<O extends Option>(props: SelectProps<O>) {
  if (isControlled(props)) return <UIComponent<O> {...props} />;
  return <FormWrapper<O> {...props} />;
}
