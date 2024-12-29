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

type Props = HTMLAttributes<HTMLInputElement> & {
  ref: RefObject<Ref>;
  name: string;
  accept: string;
  onValueChange?: (value: File) => void;
};

export default function FileInput({
  name,
  onValueChange,
  ref,
  ...props
}: Props) {
  const inputEl = useRef<HTMLInputElement | null>();
  const { control } = useFormContext();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onFieldChange: (value: File) => void,
  ) => {
    if (!e.currentTarget?.files?.length) return;
    const [file] = e.currentTarget.files;
    onFieldChange(file);
    if (onValueChange) onValueChange(file);
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
          onBlur={field.onBlur}
          onChange={(e) => handleChange(e, field.onChange)}
        />
      )}
    />
  );
}
