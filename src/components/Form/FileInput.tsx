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
  IsMultiple extends true ? (value: FileList) => void : (value: File) => void;

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
  const inputEl = useRef<HTMLInputElement | null>(null);
  const { control } = useFormContext();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onFieldChange: OnValueChange<IsMultiple>,
  ) => {
    if (!e.currentTarget?.files?.length) return;

    if (multiple) {
      (onFieldChange as (value: FileList) => void)(e.currentTarget.files);
      onValueChange?.(e.currentTarget.files as any);
    } else {
      (onFieldChange as (value: File) => void)(e.currentTarget.files[0]);
      onValueChange?.(e.currentTarget.files[0] as any);
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
