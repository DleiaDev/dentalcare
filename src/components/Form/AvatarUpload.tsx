import Svg from "@/components/Svg";
import Button from "@/components/Button";
import { ChangeEvent, useRef, useState } from "react";
import Avatar from "../Avatar";
import { Controller, useFormContext } from "react-hook-form";
import Separator from "../ui/separator";
import ErrorMessage from "./ErrorMessage";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  className?: string;
};

export default function AvatarUpload({ name, className }: Props) {
  const inputEl = useRef<HTMLInputElement | null>(null);
  const {
    control,
    watch,
    resetField,
    formState: { errors },
  } = useFormContext();

  const [rerender, setRerender] = useState(0);

  const value = watch(name);
  let previewSrc = undefined;

  if (value instanceof File) {
    if (value) previewSrc = URL.createObjectURL(value);
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    onFieldChange: (value: File) => void,
  ) => {
    if (!e.currentTarget?.files?.length) return;
    const [file] = e.currentTarget.files;
    onFieldChange(file);
  };

  const errorMessage = errors[name]?.message;

  return (
    <div
      className={cn(
        "rounded-2xl p-5 mb-5",
        errorMessage && "bg-input-invalid",
        className,
      )}
    >
      <div className="flex gap-6">
        {previewSrc ? (
          <img
            src={previewSrc}
            className="w-20 h-20 rounded-full object-cover"
            alt="Preview of employee's profile image"
          />
        ) : (
          <Svg
            name="user"
            type="flat"
            className="w-20 h-20 text-gray-400 border-2 border-gray-500 border-dashed rounded-full"
          />
        )}
        <div className="flex flex-col items-start justify-around">
          <div className="flex gap-3">
            <Button
              intent="text"
              onClick={() => {
                if (inputEl.current) {
                  inputEl.current.click();
                  inputEl.current.value = "";
                }
              }}
            >
              Upload photo
            </Button>
            {previewSrc && <Separator orientation="vertical" />}
            {previewSrc && (
              <Button
                intent="text"
                color="destructive"
                onClick={() => {
                  resetField(name);
                  setRerender(rerender + 1);
                }}
              >
                Delete
              </Button>
            )}
          </div>
          <p className="w-[35ch] text-sm text-gray-700 font-medium">
            {
              "An image of the person, it's best if it has the same length and height"
            }
          </p>
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
        </div>
      </div>
      {typeof errorMessage === "string" && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </div>
  );
}
