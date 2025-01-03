import { useToast } from "@/hooks/useToast";
import {
  type ChangeEvent,
  type HTMLAttributes,
  type RefObject,
  useImperativeHandle,
  useRef,
} from "react";
import { Controller, useFormContext } from "react-hook-form";

export type Ref = {
  openFileBrowser: () => void;
};

type OnValueChange<IsMultiple extends boolean | undefined> =
  IsMultiple extends true ? (value: File[]) => void : (value: File) => void;

type Props<IsMultiple extends boolean | undefined> =
  HTMLAttributes<HTMLInputElement> & {
    ref: RefObject<Ref>;
    name: string;
    accept?: string;
    multiple?: IsMultiple;
    onValueChange?: OnValueChange<IsMultiple>;
  };

export default function FileInput<IsMultiple extends boolean | undefined>({
  ref,
  name,
  multiple,
  onValueChange,
  ...props
}: Props<IsMultiple>) {
  const { toast } = useToast();

  const inputEl = useRef<HTMLInputElement | null>(null);
  const { control, getValues } = useFormContext();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onFieldChange: OnValueChange<IsMultiple>,
  ) => {
    if (!e.currentTarget?.files?.length) return;

    const currentValue = getValues(name);

    const newFiles = [...e.currentTarget.files];
    const oldFiles = Array.isArray(currentValue)
      ? [...currentValue]
      : currentValue
        ? [currentValue]
        : [];

    const sameNameExists = newFiles.some((newFile) =>
      oldFiles.some((oldFile) => oldFile.name === newFile.name),
    );

    if (sameNameExists)
      return toast({
        variant: "destructive",
        title: "Error",
        description: "You have selected a file with the same name.",
      });

    if (multiple) {
      (onFieldChange as (value: File[]) => void)([
        ...currentValue,
        ...e.currentTarget.files,
      ]);
      if (onValueChange)
        (onValueChange as (value: File[]) => void)([...e.currentTarget.files]);
    } else {
      (onFieldChange as (value: File) => void)(e.currentTarget.files[0]);
      if (onValueChange)
        (onValueChange as (value: File) => void)(e.currentTarget.files[0]);
    }
  };

  const openFileBrowser = () => {
    if (!inputEl.current) return;
    inputEl.current.click();
    inputEl.current.value = "";
  };

  useImperativeHandle(ref, () => ({
    openFileBrowser,
  }));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...props}
          type="file"
          className="hidden"
          ref={(element) => {
            field.ref(element);
            inputEl.current = element;
          }}
          multiple={multiple}
          onBlur={field.onBlur}
          onChange={(e) => handleChange(e, field.onChange)}
        />
      )}
    />
  );
}
