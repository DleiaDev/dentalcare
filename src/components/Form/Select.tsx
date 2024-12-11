import get from "lodash.get";
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
import { cn } from "@/lib/utils";
import Label from "./Label";
import { Controller, useFormContext } from "react-hook-form";
import { Fragment, ReactNode } from "react";
import ErrorMessage from "./ErrorMessage";

type Option<V = string | number> = {
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

type Props<O extends Option> = {
  name?: string;
  value?: O["value"];
  label?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  isFetching?: boolean;
  fetchingFailed?: boolean;
  onValueChange?: (value: O["value"]) => void;
  selectedValueFormat?: (selectedOption: O) => ReactNode;
  groups?: Group<O>[];
  options?: O[];
};

type SelectValueFormattedProps<O extends Option> = {
  value: O["value"];
  placeholder: Props<O>["placeholder"];
  selectedValueFormat?: Props<O>["selectedValueFormat"];
  options?: O[];
  groups?: Group<O>[];
};

function getOptionInGroups<O extends Option>(
  value: O["value"],
  groups: Group<O>[],
) {
  for (const group of groups) {
    const foundOption = group.options.find((o) => o.value === value);
    if (foundOption) return foundOption;
  }
}

function getSelectedOption<O extends Option>(
  value: O["value"],
  options?: O[],
  groups?: Group<O>[],
) {
  let selectedOption;

  if (options) {
    selectedOption = options.find((option) => option.value == value);
  } else if (groups) {
    selectedOption = getOptionInGroups(value, groups);
  }
  return selectedOption;
}

function SelectValueFormatted<O extends Option>({
  options,
  groups,
  value,
  placeholder,
  selectedValueFormat,
}: SelectValueFormattedProps<O>) {
  const selectedOption = getSelectedOption<O>(value, options, groups);

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
          <Tooltip key={option.value} content={option.disabledReason}>
            <div>
              <OptionComponent option={option} />
            </div>
          </Tooltip>
        ) : (
          <div key={option.value}>
            <OptionComponent option={option} />
          </div>
        ),
      )}
    </>
  );
}

function UIComponent<O extends Option>({
  name,
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
  onValueChange,
  selectedValueFormat,
}: Props<O> & {
  value: O["value"];
  errorMessage?: string;
  onValueChange: Exclude<Props<O>["onValueChange"], undefined>;
}) {
  const handleValueChange = (value: O["value"]) => {
    const selectedOption = getSelectedOption(value, options, groups);
    if (onValueChange && selectedOption) onValueChange(selectedOption.value);
  };

  return (
    <div className={cn("mb-7", containerClassName)}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <SelectRoot
        value={value !== undefined ? "1" : undefined}
        onValueChange={handleValueChange}
        disabled={isFetching || fetchingFailed}
      >
        <SelectTrigger
          id={name}
          className={cn(
            errorMessage
              ? "border-error ring-error/20"
              : fetchingFailed
                ? "border-error bg-input-invalid"
                : "data-[state=open]:border-primary focus:border-primary ring-primary/20 ",
            className,
          )}
        >
          {isFetching ? (
            <div>Loading...</div>
          ) : fetchingFailed ? (
            <div>An error occurred during loading</div>
          ) : (
            <SelectValueFormatted
              options={options}
              groups={groups}
              value={value}
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
                {groups[i + 1] && <SelectSeparator />}
              </Fragment>
            ))
          ) : options ? (
            <Options options={options} />
          ) : null}
        </SelectContent>
      </SelectRoot>
      {typeof errorMessage === "string" && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </div>
  );
}

function FormWrapper<O extends Option>({
  name,
  onValueChange,
  ...props
}: Props<O> & { name: string }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = get(errors, name)?.message;

  const handleValueChange = (
    value: O["value"],
    onFieldChange: (value: O["value"]) => void,
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

export default function Select<O extends Option>({
  name,
  value,
  onValueChange,
  ...props
}: Props<O>) {
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
  }
}
