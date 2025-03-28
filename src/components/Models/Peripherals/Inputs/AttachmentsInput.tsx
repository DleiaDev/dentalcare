import Button from "@/components/Button";
import FilePreview, {
  Props as FilePreviewProps,
} from "@/components/FilePreview";
import ErrorMessage from "@/components/Form/ErrorMessage";
import FileInput, { Ref } from "@/components/Form/FileInput";
import Label from "@/components/Form/Label";
import { PeripheralAttachment } from "@prisma/zod/modelSchema/PeripheralAttachmentSchema";
import { PlusIcon, XIcon } from "lucide-react";
import { getCldImageUrl } from "next-cloudinary";
import { useRef } from "react";
import { useFormContext } from "react-hook-form";

const name = "attachments";

function AttachmentPreviews({
  attachmentsInDatabase,
  onDeleteClick,
}: {
  attachmentsInDatabase?: PeripheralAttachment[];
  onDeleteClick: (attachment: PeripheralAttachment | File) => void;
}) {
  const { watch, getValues } = useFormContext();

  const attachmentIds = watch(
    "attachmentIds",
    getValues("attachmentIds") ?? [],
  ) as string[];
  const attachmentFiles = watch("attachments") as File[];

  const attachmentPreviews = [...attachmentIds, ...attachmentFiles].map(
    (fileOrId) => {
      const isId = typeof fileOrId === "string";
      let previewUrl: string | undefined;

      const dbAttachment =
        isId && attachmentsInDatabase
          ? attachmentsInDatabase.find(
              (dbAttachment) => dbAttachment.id === fileOrId,
            )
          : undefined;

      if (fileOrId instanceof File) {
        previewUrl = fileOrId.type.startsWith("image/")
          ? URL.createObjectURL(fileOrId)
          : undefined;
      } else if (dbAttachment) {
        previewUrl = dbAttachment.fileType.startsWith("image/")
          ? getCldImageUrl({
              width: 135,
              height: 135,
              src: dbAttachment.fileId,
            })
          : undefined;
      }

      return {
        name: fileOrId instanceof File ? fileOrId.name : dbAttachment?.fileName,
        type: fileOrId instanceof File ? fileOrId.type : dbAttachment?.fileType,
        previewUrl,
      };
    },
  );

  const handleDeleteClick = (attachment: FilePreviewProps["file"]) => {
    const attachmentFile = attachmentFiles.find(
      (a) => a.name === attachment.name,
    );
    const dbAttachment = attachmentsInDatabase?.find(
      (a) => a.fileName === attachment.name,
    );
    const realAttachment = attachmentFile || dbAttachment;
    if (realAttachment) onDeleteClick(realAttachment);
  };

  return (
    <>
      {attachmentPreviews.map((attachment) => (
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
          <Button intent="text" onClick={() => handleDeleteClick(attachment)}>
            <XIcon className="text-gray-800 w-6 h-6" />
          </Button>
        </div>
      ))}
    </>
  );
}

type Props = {
  attachmentsInDatabase?: PeripheralAttachment[];
};

export default function AttachmentsInput({ attachmentsInDatabase }: Props) {
  const {
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors.attachments?.message;
  const ref = useRef<Ref>(null);
  const formAttachments = watch(name) as File[];

  const handleOnClick = () => {
    ref.current?.openFileBrowser();
  };

  const handleDeleteClick = (attachment: PeripheralAttachment | File) => {
    let index: number;

    if (attachment instanceof File) {
      index = formAttachments.findIndex((a) => a.name === attachment.name);
      if (index !== -1) {
        formAttachments.splice(index, 1);
        setValue(name, formAttachments);
      }
    } else {
      const attachmentIds = getValues("attachmentIds") as string[];
      index = attachmentIds.findIndex((id) => id === attachment.id);
      if (index !== -1) {
        attachmentIds.splice(index, 1);
        setValue("attachmentIds", attachmentIds);
      }
    }
  };

  return (
    <div className="col-span-2">
      <Label>Attachments</Label>
      <p className="text-gray-600 mb-3">
        Upload additional product photos, instruction manuals, insurance
        documents, etc.
      </p>
      <div className="flex flex-col gap-4">
        <AttachmentPreviews
          attachmentsInDatabase={attachmentsInDatabase}
          onDeleteClick={handleDeleteClick}
        />
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
