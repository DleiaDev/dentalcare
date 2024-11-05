import PhoneInputBase from "react-phone-number-input/input";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import Label from "./Label";
import ErrorMessage from "./ErrorMessage";

type Props = {
  name: string;
  label: string;
};

export default function PhoneInput({ name, label }: Props) {
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
          <PhoneInputBase
            country="US"
            className={cn(
              "flex h-12 w-full rounded-md border border-border bg-transparent px-3 py-1 font-medium shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
              errorMessage
                ? "border-error ring-error/20"
                : "focus:border-primary ring-primary/20 ",
            )}
            {...field}
          />
        )}
      />
      {typeof errorMessage === "string" && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </div>
  );
}
