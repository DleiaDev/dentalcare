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
import { cn } from "@/lib/utils";
import Label from "./Label";
import { Controller, useFormContext } from "react-hook-form";
import { Fragment } from "react";
import ErrorMessage from "./ErrorMessage";

type Option = {
  label: string;
  value: string;
};

type Group = {
  label: string;
  options: Option[];
};

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  className?: string;
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

function Options({ options }: { options: Option[] }) {
  return (
    <>
      {options.map((option) => (
        <SelectItem key={option.value} value={option.value}>
          {option.label}
        </SelectItem>
      ))}
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
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[name]?.message;
  return (
    <div className="mb-7">
      <Label>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <SelectRoot value={field.value} onValueChange={field.onChange}>
            <SelectTrigger
              className={cn(
                errorMessage
                  ? "border-error ring-error/20"
                  : "data-[state=open]:border-primary focus:border-primary ring-primary/20 ",
                className,
              )}
            >
              <SelectValue placeholder={placeholder} />
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
