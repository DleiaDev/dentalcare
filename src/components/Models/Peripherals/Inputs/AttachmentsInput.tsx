import FileInput from "@/components/Form/FileInput";
import Label from "@/components/Form/Label";

export default function AttachmentsInput() {
  return (
    <div className="col-span-2">
      <Label>Attachments</Label>
      <p className="text-gray-600">
        Upload additional product photos, instruction manuals, insurance
        documents, etc.
      </p>
      <FileInput />
    </div>
  );
}
