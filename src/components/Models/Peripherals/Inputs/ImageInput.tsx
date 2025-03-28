import Button from "@/components/Button";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "@/components/Form/ErrorMessage";
import { cn } from "@/lib/utils";
import FileInput, { Ref } from "@/components/Form/FileInput";
import Svg from "@/components/Svg";
import { Peripheral } from "@prisma/client";
import { getCldImageUrl } from "next-cloudinary";

export default function ImageInput({
  imageId,
}: {
  imageId?: Peripheral["imageId"];
}) {
  const name = "image";
  const imageWidth = 284;

  const imageUrl = imageId
    ? getCldImageUrl({
        width: imageWidth,
        height: imageWidth,
        src: imageId,
      })
    : undefined;

  const [previewSrc, setPreviewSrc] = useState<string | undefined>(imageUrl);

  const {
    resetField,
    setValue,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message;

  const FileInputRef = useRef<Ref>(null);
  const handleClick = () => {
    FileInputRef.current?.openFileBrowser();
  };

  const handleReset = () => {
    resetField(name); // Reset error
    setValue(name, null); // Set as empty
    setPreviewSrc(undefined);
  };

  const handleValueChange = (value: File) => {
    setPreviewSrc(URL.createObjectURL(value));
  };

  return (
    <div className="mb-7">
      {/* Input */}
      <FileInput
        ref={FileInputRef}
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
            variant="text"
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
          <Button
            variant="text"
            className="absolute top-0 left-0 w-full h-full bg-input-invalid flex justify-center items-center opacity-100 hover:bg-input-invalid"
            onClick={handleClick}
          >
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </Button>
        )}
      </div>

      {/* Buttons */}
      {previewSrc && (
        <div className="flex justify-between">
          <Button variant="ghost" onClick={handleClick}>
            Upload new image
          </Button>
          <Button color="destructive" variant="ghost" onClick={handleReset}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
