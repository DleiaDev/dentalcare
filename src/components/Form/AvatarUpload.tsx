import Svg from "@/components/Svg";
import Button from "@/components/Button";
import { ChangeEvent, useRef, useState } from "react";
import Avatar from "../Avatar";
import { useFormContext } from "react-hook-form";
import Separator from "../ui/separator";
import ErrorMessage from "./ErrorMessage";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
};

export default function AvatarUpload({ name }: Props) {
  const inputEl = useRef<HTMLInputElement | null>();
  const {
    register,
    watch,
    resetField,
    formState: { errors },
  } = useFormContext();
  const { ref, ...field } = register(name);

  const [rerender, setRerender] = useState(0);

  const value = watch(name);
  let previewSrc = undefined;

  if (value instanceof FileList) {
    const [file] = value;
    if (file) previewSrc = URL.createObjectURL(file);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget?.files?.length) return;
    field.onChange(e);
  };

  const errorMessage = errors[name]?.message;

  return (
    <div className={cn("rounded-2xl p-5", errorMessage && "bg-input-invalid")}>
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
            <Button intent="text" onClick={() => inputEl.current?.click()}>
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
          <input
            type="file"
            accept="image/*"
            className="hidden"
            {...field}
            onChange={handleChange}
            ref={(element) => {
              ref(element);
              inputEl.current = element;
            }}
          />
        </div>
      </div>
      {typeof errorMessage === "string" && (
        <ErrorMessage className="mt-2">{errorMessage}</ErrorMessage>
      )}
    </div>
  );
}
