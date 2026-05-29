import Svg from "@/components/Svg";
import Button from "@/components/Button";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import Separator from "../ui/separator";
import ErrorMessage from "./ErrorMessage";
import { cn } from "@/lib/utils";
import FileInput, { Ref } from "./FileInput";

type Props = {
  name: string;
  className?: string;
};

function getPreviewSrc(file: unknown) {
  return file instanceof File ? URL.createObjectURL(file) : undefined;
}

export default function AvatarUpload({ name, className }: Props) {
  const FileInputRef = useRef<Ref>(null);
  const {
    resetField,
    getValues,
    formState: { errors },
  } = useFormContext();

  const initialPreviewSrc = getPreviewSrc(getValues().avatar);
  const [previewSrc, setPreviewSrc] = useState<string | undefined>(
    initialPreviewSrc,
  );

  const errorMessage = errors[name]?.message;

  const handleClick = () => {
    FileInputRef.current?.openFileBrowser();
  };

  const handleReset = () => {
    resetField(name);
    setPreviewSrc(undefined);
  };

  const handleValueChange = (value: File) => {
    setPreviewSrc(URL.createObjectURL(value));
  };

  return (
    <div
      className={cn(
        "rounded-2xl p-5 mb-5",
        errorMessage && "bg-input-invalid",
        className,
      )}
    >
      <FileInput
        ref={FileInputRef}
        name={name}
        accept="image/*"
        onValueChange={handleValueChange}
      />
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
            <Button variant="text" onClick={handleClick}>
              Upload photo
            </Button>
            {previewSrc && <Separator orientation="vertical" />}
            {previewSrc && (
              <Button variant="text" color="destructive" onClick={handleReset}>
                Delete
              </Button>
            )}
          </div>
          <p className="w-[35ch] text-sm text-gray-700 font-medium">
            {
              "An image of the person, it's best if it has the same length and height"
            }
          </p>
        </div>
      </div>
      {typeof errorMessage === "string" && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
    </div>
  );
}
