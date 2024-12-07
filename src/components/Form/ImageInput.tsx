import { ChangeEvent, forwardRef, useImperativeHandle, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  onValueChange?: (value: File) => void;
};

export type Ref = {
  openFileBrowser: () => void;
};

const ImageInput = forwardRef<Ref, Props>(({ name, onValueChange }, ref) => {
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
          type="file"
          accept="image/*"
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
});
ImageInput.displayName = "ImageInput";

export default ImageInput;
