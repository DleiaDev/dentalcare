import Button from "@/components/Button";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "@/components/Form/ErrorMessage";
import { cn } from "@/lib/utils";
import FileInput, { Ref } from "@/components/Form/FileInput";
import Svg from "@/components/Svg";

export default function ImageUpload() {
  const name = "image";

  const ImageInputRef = useRef<Ref>(null);
  const [previewSrc, setPreviewSrc] = useState<string>();
  const {
    resetField,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message;

  const handleClick = () => {
    ImageInputRef.current?.openFileBrowser();
  };

  const handleReset = () => {
    resetField(name);
    setPreviewSrc(undefined);
  };

  const handleValueChange = (value: File) => {
    setPreviewSrc(URL.createObjectURL(value));
  };

  return (
    <div className="mb-7">
      {/* Input */}
      <FileInput
        ref={ImageInputRef}
        accept="image/*"
        name={name}
        onValueChange={handleValueChange}
      />

      <div
        className={cn(
          "aspect-square rounded-xl relative",
          previewSrc && "border-2 border-border",
        )}
      >
        {previewSrc ? (
          // Preview
          <img
            src={previewSrc}
            className="w-full h-full object-cover rounded-xl border-4 border-gray-300 animate-in fade-in duration-500"
            alt="Preview of employee's profile image"
          />
        ) : (
          // Trigger
          <Button
            intent="text"
            color="gray"
            onClick={handleClick}
            className="w-full h-full group flex-col gap-4 border-4 border-border border-dashed transition-colors duration-300 hover:bg-gray-100 hover:border-gray-500"
          >
            <Svg
              name="image"
              type="gray"
              className="w-16 h-16 transition-opacity duration-300 opacity-70 group-hover:opacity-100"
            />
            <p className="font-semibold text-gray-700">
              Click to upload
              <br />
              an image
            </p>
          </Button>
        )}

        {/* Error */}
        {typeof errorMessage === "string" && (
          <div className="absolute top-0 left-0 w-full h-full bg-input-invalid flex justify-center items-center opacity-100">
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </div>
        )}
      </div>

      {/* Buttons */}
      {previewSrc && (
        <div className="flex justify-between">
          <Button intent="ghost" onClick={handleClick}>
            Upload new image
          </Button>
          <Button color="destructive" intent="ghost" onClick={handleReset}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
