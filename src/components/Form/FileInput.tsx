import { useToast } from "@/hooks/useToast";
import {
  type ChangeEvent,
  type InputHTMLAttributes,
  type Ref,
  useImperativeHandle,
  useRef,
} from "react";
import { Controller, useFormContext } from "react-hook-form";

export type FileInputHandle = {
  openFileBrowser: () => void;
};

type Props = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  | "type"
  | "value"
  | "defaultValue"
  | "className"
  | "onChange"
  | "onBlur"
  | "multiple"
> & {
  ref?: Ref<FileInputHandle>;
  name: string;
} & (
    | {
        multiple: true;
        /** Called with the full list of files after new ones are added. */
        onValueChange?: (value: File[]) => void;
      }
    | {
        multiple?: false;
        onValueChange?: (value: File) => void;
      }
  );

export default function FileInput({
  ref,
  name,
  multiple,
  onValueChange,
  ...props
}: Props) {
  const { toast } = useToast();

  const inputEl = useRef<HTMLInputElement | null>(null);
  const { control } = useFormContext();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    currentValue: unknown,
    onFieldChange: (value: File | File[]) => void,
  ) => {
    const newFiles = [...(e.currentTarget.files ?? [])];
    if (!newFiles.length) return;

    if (!multiple) {
      onFieldChange(newFiles[0]);
      (onValueChange as ((value: File) => void) | undefined)?.(newFiles[0]);
      return;
    }

    const oldFiles: File[] = Array.isArray(currentValue)
      ? currentValue
      : currentValue instanceof File
        ? [currentValue]
        : [];

    const sameNameExists = newFiles.some((newFile) =>
      oldFiles.some((oldFile) => oldFile.name === newFile.name),
    );

    if (sameNameExists) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You have selected a file with the same name.",
      });
      return;
    }

    const files = [...oldFiles, ...newFiles];
    onFieldChange(files);
    (onValueChange as ((value: File[]) => void) | undefined)?.(files);
  };

  const openFileBrowser = () => {
    if (!inputEl.current) return;
    // Reset so selecting the same file again still fires a change event
    inputEl.current.value = "";
    inputEl.current.click();
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
          onChange={(e) => handleChange(e, field.value, field.onChange)}
        />
      )}
    />
  );
}
