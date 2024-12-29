import Button from "@/components/Button";
import FileInput, { Ref } from "@/components/Form/FileInput";
import Label from "@/components/Form/Label";
import { PlusIcon } from "lucide-react";
import { useRef } from "react";

export default function AttachmentsInput() {
  const ref = useRef<Ref>(null);

  const handleOnClick = () => {
    ref.current?.openFileBrowser();
  };

  return (
    <div className="col-span-2">
      <Label>Attachments</Label>
      <p className="text-gray-600">
        Upload additional product photos, instruction manuals, insurance
        documents, etc.
      </p>
      <Button onClick={handleOnClick}>
        <PlusIcon />
      </Button>
      <FileInput name="attachments" ref={ref} multiple />
    </div>
  );
}
