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

type Option = {
  label: ReactNode;
  value: string;
  description?: string;
  disabled?: boolean;
  disabledReason?: string;
};

type Group = {
  label: string;
  options: Option[];
};

type Props = {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  containerClassName?: string;
  isFetching?: boolean;
  fetchingFailed?: boolean;
  onValueChange?: (value: Option["value"]) => void;
  selectedValueFormat?: (selectedOption: Option) => ReactNode;
} & (
  | {
      groups: Group[];
      options?: never;
    }
  | {
      groups?: never;
      options: Option[];
    }
);

type SelectValueFormattedProps = {
  value: Option["value"];
  placeholder: Props["placeholder"];
  selectedValueFormat?: Props["selectedValueFormat"];
  options?: Option[];
  groups?: Group[];
};

function SelectValueFormatted({
  options,
  groups,
  value,
  placeholder,
  selectedValueFormat,
}: SelectValueFormattedProps) {
  let selectedOption;
  if (options) {
    selectedOption = options.find((option) => option.value === value);
  } else if (groups) {
    // TODO:
  }

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
    <SelectItem value={option.value} disabled={option.disabled}>
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

export default function Select({
  name,
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
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = get(errors, name)?.message;

  const handleValueChange = (
    value: Option["value"],
    onFieldChange: (value: Option["value"]) => void,
  ) => {
    onFieldChange(value);
    if (onValueChange) onValueChange(value);
  };

  return (
    <div className={cn("mb-7", containerClassName)}>
      {label && <Label>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <SelectRoot
            value={field.value}
            onValueChange={(value) => handleValueChange(value, field.onChange)}
            disabled={isFetching || fetchingFailed}
          >
            <SelectTrigger
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
                  value={field.value}
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
              ) : (
                <Options options={options} />
              )}
            </SelectContent>
          </SelectRoot>
        )}
      />
      {typeof errorMessage === "string" && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </div>
  );
}
