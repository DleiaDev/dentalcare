import Button from "@/components/Button";
import FilePreview from "@/components/FilePreview";
import ErrorMessage from "@/components/Form/ErrorMessage";
import FileInput, { Ref } from "@/components/Form/FileInput";
import Label from "@/components/Form/Label";
import { PlusIcon, XIcon } from "lucide-react";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

const name = "attachments";

function AttachmentPreviews({
  onDeleteClick,
}: {
  onDeleteClick: (attachment: File) => void;
}) {
  const { watch } = useFormContext();
  const attachments = watch(name) as File[];
  return (
    <>
      {attachments.map((attachment) => (
        <div
          key={attachment.name}
          className="flex gap-3 items-center justify-between"
        >
          <div className="flex gap-3 items-center overflow-hidden">
            <div className="border border-border border-dashed rounded-lg p-1 min-w-36 w-36 min-h-36 h-36 flex items-center justify-center bg-gray-300">
              <FilePreview
                file={attachment}
                imageClassName="rounded-lg"
                iconClassName="w-7 h-7 rounded-lg"
              />
            </div>
            <div className="overflow-hidden">
              <div className="text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
                {attachment.name}
              </div>
            </div>
          </div>
          <Button intent="text" onClick={() => onDeleteClick(attachment)}>
            <XIcon className="text-gray-800 w-6 h-6" />
          </Button>
        </div>
      ))}
    </>
  );
}

export default function AttachmentsInput() {
  const {
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors.attachments?.message;
  const ref = useRef<Ref>(null);

  const handleOnClick = () => {
    ref.current?.openFileBrowser();
  };

  const handleDeleteClick = (attachment: File) => {
    const currentAttachments = getValues(name) as File[];
    const i = currentAttachments.findIndex((a) => a.name === attachment.name);
    if (i === -1) return;
    currentAttachments.splice(i, 1);
    setValue(name, currentAttachments);
  };

  return (
    <div className="col-span-2">
      <Label>Attachments</Label>
      <p className="text-gray-600 mb-3">
        Upload additional product photos, instruction manuals, insurance
        documents, etc.
      </p>
      <div className="flex flex-col gap-4">
        <AttachmentPreviews onDeleteClick={handleDeleteClick} />
        <Button
          intent="text"
          onClick={handleOnClick}
          className="flex gap-2 py-3 text-gray-700 border-4 border-border border-dashed hover:text-gray-700 hover:bg-gray-100 hover:border-gray-500 transition-colors duration-300"
        >
          Upload additional files
          <PlusIcon className="text-gray-600" />
        </Button>
      </div>
      {typeof errorMessage === "string" && (
        <ErrorMessage>{errorMessage}</ErrorMessage>
      )}
      <FileInput name={name} ref={ref} multiple />
    </div>
  );
}
